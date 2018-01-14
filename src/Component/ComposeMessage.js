import React from 'react'
import { withRouter } from 'react-router-dom'
class ComposeMessage extends React.Component {
  messageAdded = (e)=> {
    e.preventDefault()
    this.props.addMessage({
      subject: e.target.subject.value,
      body: e.target.body.value
    })
    this.props.history.push('/')
  }
  render() {
  return(
      <form className="form-horizontal well" onSubmit={ this.messageAdded }>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary"></input>
          </div>
        </div>
      </form>
  )
}
}
export default withRouter(ComposeMessage)
