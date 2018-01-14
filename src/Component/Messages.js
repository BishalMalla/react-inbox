import React from 'react'
import Message from './Message'
class Messages extends React.Component {
  render() {
    // console.log(this.props)
    return(
      <div className="collection">
        {this.props.messages.map(message=> {
          return(
            <Message key={message.id} id={message.id} message={message} starred={this.props.starred} checkboxClicked={this.props.checkboxClicked} markRead={this.props.markRead}/>
          )
        })}
      </div>
    )
  }
}
export default Messages
