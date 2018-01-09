import React from 'react'
const Toolbar = (props)=> {
  let checkAll = "fa-square-o"
  let array = props.messages.filter(ele=> {
    return ele.selected
  })
  if(array.length === props.messages.length) {
    checkAll = "fa-check-square-o"
  }
  if(array.length > 0 && array.length < props.messages.length) {
    checkAll = "fa-minus-square-o"
  }
  return(
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">2</span>
          unread messages
        </p>

        <button className="btn btn-default" onClick={props.isCheckAll}>
          <i className={`fa ${checkAll}`}></i>
        </button>

        <button className="btn btn-default" onClick={props.markAsRead}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={props.marksAsUnread}>
          Mark As Unread
        </button>

        <select className="form-control label-select" onClick={props.addLabels}>
          <option>Apply label</option>
          <option value="dev" onClick={props.addLabels}>dev</option>
          <option value="personal" onClick={props.addLabels}>personal</option>
          <option value="gschool" onClick={props.addLabels}>gschool</option>
        </select>

        <select className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={props.moveToTrash}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}
export default Toolbar
