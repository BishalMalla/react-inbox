import React from 'react'
class Message extends React.Component {
  // Editing here

  render() {
    // console.log(this.props)
    let isRead
    let message
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
    if(check === 'checked') {
      message = <strong>{this.props.message.subject}</strong>
    }
    else{
      message= this.props.message.subject
    }
    return(
        <div className={`row message ${isRead}` }>
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
            <a href="#">
              {message}
            </a>
          </div>
        </div>
    )
  }
}
export default Message
