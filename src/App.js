import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
import Message from './Component/Message'
import Messages from './Component/Messages'
import Toolbar from './Component/Toolbar'
import ComposeMessage from './Component/ComposeMessage'
let selectAll = true
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      display: false
    }
  }
  //getting the data messages
  async componentDidMount() {
    let data = await fetch('http://localhost:8082/api/messages')
    let json = await data.json()
    this.setState({
      messages: json._embedded.messages.reverse()
    })
  }
  //posting the new messages
  addMessage = async(message)=> {
    const response = await fetch('http://localhost:8082/api/messages', {
        method: 'POST',
        body: JSON.stringify({subject: message.subject,
      body: message.body,}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      const newMessage = await response.json()
      const messages = [newMessage,...this.state.messages]
      this.setState({
        messages: messages,
        display: false
      })
      // document.getElementById('subject').value = ""
      // document.getElementById('body').value = ""

  }
  isStarred = async (message)=> {
    const obj = {
      'messageIds':[ message.id],
      "command": "star",
      "star": !message.starred
    }
    let arr = this.state.messages.slice(0)
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].id === message.id) {
        arr[i].starred = !arr[i].starred
      }
    }
    this.setState({
      messages: arr
    })
    const response = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(obj)
      })
  }
  checkboxClicked = (message)=> {
    let arr = this.state.messages.slice(0)
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].id === message.id) {
        arr[i].selected = !arr[i].selected
      }
    }
    this.setState({
      messages: arr
    })
  }
  async toggleSelect(message) {
    this.checkboxClicked(message)
  }
  isCheckAll = ()=> {
    let message = this.state.messages.slice(0)
    if(selectAll === true) {
      for(let i = 0; i < message.length; i++) {
        message[i].selected = true
        this.setState({
          messages: message
        })
      }
      selectAll = false
    }
    else {
      for(let i = 0; i < message.length; i++) {
        message[i].selected = false
        this.setState({
          messages: message
        })
      }
      selectAll = true
    }
  }
  markAsRead= async()=> {
    let message = this.state.messages.slice(0)
    let indexes = message.map(function(obj) {
      if(obj.selected === true) {
          return obj.id;
      }
    }).filter(isFinite)
    const obj = {
      'messageIds': indexes,
      "command": "read",
      "read": true
    }
    const response = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(obj)
      })
    for(let i = 0 ;i< indexes.length; i++){
      for(let j = 0 ; j < message.length; j++){
        if(message[j].id === indexes[i]) {
          message[j].read = true
          message[j].selected = false
        }
      }
    }
    this.setState({
      messages: message
    })
  }
  marksAsUnread= async()=> {
    let message = this.state.messages.slice(0)
    let indexes = message.map(function(obj) {
      if(obj.selected === true) {
          return obj.id;
      }
    }).filter(isFinite)
    const obj = {
      'messageIds': indexes,
      "command": "read",
      "read": false
    }
    const response = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(obj)
      })
      for(let i = 0 ; i < indexes.length; i++) {
        for(let j = 0 ; j < message.length; j++) {
          if(message[j].id === indexes[i]) {
            message[j].read = false
            message[j].selected = false
          }
        }
      }
      this.setState({
        messages: message
      })
  }
  moveToTrash= async()=> {
    let arr = []
    let message = this.state.messages.slice(0)
    let indexes = message.map(function(obj) {
      if(obj.selected === true) {
          return obj.id;
      }
    }).filter(isFinite)
    const obj = {
      'messageIds': indexes,
      "command": "delete",
    }
    for(let i = 0; i < message.length; i++) {
      if(!message[i].selected) {
        arr.push(message[i])
      }
    }
    this.setState({
      messages: arr
    })
    const response = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(obj)
      })
  }
  addLabels =async (e)=> {
    let message = this.state.messages.slice(0)
    let indexes = message.map(function(obj) {
      if(obj.selected === true) {
          return obj.id;
      }
    }).filter(isFinite)
    const obj = {
      'messageIds': indexes,
      "command": "addLabel",
      "label": e.target.value
    }
    for(let i = 0; i < message.length; i++) {
      for(let j = 0; j < indexes.length; j++) {
        if(message[i].id === indexes[j]) {
          if(message[i].labels.includes(e.target.value)) {
            return
          }
          message[i].labels.push(e.target.value)
          message[i].selected = false
        }
      }
    }
    this.setState({
      messages: message
    })
    e.target.value = 'Apply label'
    const response = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(obj)
      })
  }
  removeLabels = async(e)=> {
    let message = this.state.messages.slice(0)
    let indexes = message.map(function(obj) {
      if(obj.selected === true) {
          return obj.id;
      }
    }).filter(isFinite)
    const obj = {
      'messageIds': indexes,
      "command": "removeLabel",
      "label": e.target.value
    }
    for(let i = 0; i < message.length; i++) {
      if(message[i].selected === true) {
        for(let j = 0; j < message[i].labels.length; j++)  {
          if(message[i].labels[j] === e.target.value) {
            message[i].labels.splice(j, 1)
            message[i].selected = false
          }
        }
      }
    }
    this.setState({
      messages: message
    })
    e.target.value = 'Remove label'
    const response = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(obj)
      })
  }
  showCompose = ()=> {
    this.setState({
      display: true
    })
  }
  markRead = async(e)=> {
    let arr = this.state.messages.slice(0)
    arr.map(ele => {
        if(ele.id === Number(e.target.id)){
          ele.read = true
        }
    })
    const obj = {
      'messageIds': [Number(e.target.id)],
      "command": "read",
      "read": true
    }
    this.setState({
      messages: arr
    })
    const response = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(obj)
      })
  }
  render() {
    return (
      <div className="container">
        <h1>React Inbox </h1>
          <Toolbar messages={this.state.messages} isCheckAll={this.isCheckAll} markAsRead={this.markAsRead} marksAsUnread={this.marksAsUnread} moveToTrash={this.moveToTrash} addLabels={this.addLabels} removeLabels={this.removeLabels} showCompose={this.showCompose}/>
          <Route path='/compose' render={() => (
            <ComposeMessage addMessage={ this.addMessage} display={this.state.display}/>
          )} />

          {/* <ComposeMessage addMessage={this.addMessage} display={this.state.display}/> */}
          <Messages messages={this.state.messages} starred={this.isStarred} checkboxClicked={this.checkboxClicked} markRead={this.markRead}/ >
      </div>
    );
  }
}

export default App;
