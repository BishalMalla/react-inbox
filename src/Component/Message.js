import React from 'react'
import {
  Route,
  Link,
} from 'react-router-dom'
class Message extends React.Component {
  // Editing here
  constructor(props) {
    super(props)
    this.state = {
      body: []
    }
  }
  async componentDidMount() {
    let data = await fetch(`http://localhost:8082/api/messages/${this.props.message.id}`)
    let json = await data.json()
    this.setState({
      body: json.body
    })
  }
  render() {
    let isSelected = ""
    let isRead
    let check = ""
    let isStarred = ""
    if(this.props.message.read === true) {
      isRead = "read"
    }
    else {
      isRead = "unread"
    }
    if(this.props.message.selected === true) {
      check = "checked"
    }
    if(this.props.message.starred === true) {
      isStarred = "star fa fa-star"
    }
    else {
      isStarred = "star fa fa-star-o"
    }
    if(this.props.message.selected === true) {
      isSelected = "selected"
    }
    return(
        <div className={`row message ${isRead} ${isSelected}` }>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2" onClick={()=>this.props.checkboxClicked(this.props.message)}>
                <input type="checkbox" checked={`${check}`} />
              </div>
              <div className="col-xs-2" id={this.props.id} onClick={()=> this.props.starred(this.props.message)}>
                <i className={`${isStarred}`} id={this.props.id}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            {this.props.message.labels.map((ele,i)=> {
              return(
                <span key= {i} className="label label-warning">{ele}</span>
              )
            })}
              <Link to= {`/messages/${this.props.message.id}`}>
                <span onClick={this.props.markRead} id={this.props.message.id}> {this.props.message.subject}</span>
              </Link>
          </div>
          <Route path={`/messages/${this.props.message.id}`} render={ () => (
            <div className="row message-body">
              <div className="col-xs-11 col-xs-offset-1">
                <br></br>
                 {this.state.body}
              </div>
            </div>
          )}/>
        </div>
    )
  }
}
export default Message
