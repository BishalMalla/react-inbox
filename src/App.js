import React, { Component } from 'react';
import './App.css';
import Message from './Component/Message'
import Messages from './Component/Messages'
import Toolbar from './Component/Toolbar'
import ComposeMessage from './Component/ComposeMessage'
let selectAll = true
const messages =[
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: messages,
    }
  }

  isStarred = (message)=> {
    for(let i = 0; i < this.state.messages.length; i++) {
      if(this.state.messages[i].id === message.id) {
        this.state.messages[i].starred = !this.state.messages[i].starred
      }
    }
    this.setState({
      messages: this.state.messages
    })
  }
  checkboxClicked = (message)=> {
    for(let i = 0; i < this.state.messages.length; i++) {
      if(this.state.messages[i].id === message.id) {
        this.state.messages[i].selected = !this.state.messages[i].selected
      }
    }
    this.setState({
      messages: this.state.messages
    })
  }
  isCheckAll = ()=> {
    if(selectAll === true) {
      for(let i = 0; i < this.state.messages.length; i++) {
        this.state.messages[i].selected = true
        this.setState({
          messages: this.state.messages
        })
      }
      selectAll = false
    }
    else {
      for(let i = 0; i < this.state.messages.length; i++) {
        this.state.messages[i].selected = false
        this.setState({
          messages: this.state.messages
        })
      }
      selectAll = true
    }
  }
  markAsRead= ()=> {
    for(let i = 0; i < this.state.messages.length; i++) {
      if(this.state.messages[i].read === false && this.state.messages[i].selected === true) {
        this.state.messages[i].read = true
        this.state.messages[i].selected = false
      }
      this.setState({
        messages: this.state.messages
      })
    }
  }
  marksAsUnread= ()=>{
    console.log('here')
    for(let i = 0; i < this.state.messages.length; i++) {
      if(this.state.messages[i].selected === true) {
        this.state.messages[i].read = false
        this.state.messages[i].selected = false
      }
      this.setState({
        messages: this.state.messages
      })
    }
  }
  moveToTrash= (e)=> {
    let arr = []
    for(let i = 0; i < this.state.messages.length; i++) {
      if(!this.state.messages[i].selected) {
        arr.push(this.state.messages[i])
      }
    }
    this.setState({
      messages: arr
    })
  }
  addLabels =(e)=> {
    console.log('here')
    console.log(e.target.value)
  }
  render() {
    return (
      <div className="container">
        <h1>React Inbox </h1>
        <Toolbar messages={this.state.messages} isCheckAll={this.isCheckAll} markAsRead={this.markAsRead} marksAsUnread={this.marksAsUnread} moveToTrash={this.moveToTrash} addLabels={this.addLabels}/>
        <ComposeMessage />
        <Messages messages={this.state.messages} starred={this.isStarred} checkboxClicked={this.checkboxClicked}/>
      </div>
    );
  }
}

export default App;
