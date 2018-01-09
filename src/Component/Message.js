import React from 'react'
class Message extends React.Component {
  // Editing here

  render() {
    let isSelected = ""
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
            <a href="#">
              {this.props.message.subject}
            </a>
          </div>
        </div>
    )
  }
}
export default Message
