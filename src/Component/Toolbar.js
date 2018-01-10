import React from 'react'
const Toolbar = (props)=> {
  let checkAll = "fa-square-o"
  let disabled = ""
  let array = props.messages.filter(ele=> {
    return ele.selected
  })
  if(array.length === props.messages.length) {
    checkAll = "fa-check-square-o"
  }
  if(array.length > 0 && array.length < props.messages.length) {
    checkAll = "fa-minus-square-o"
  }
  let unreadMessageCount = props.messages.filter(ele=> {
    if(ele.read === false) {
      return ele
    }
  })
  let noMessageSelect = props.messages.filter(ele=> {
    if(ele.selected) {
      return ele
    }
  })
  console.log(noMessageSelect)
  if(noMessageSelect.length === 0) {
    disabled = "disabled"
  }
  return(
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadMessageCount.length}</span>
          unread messages
        </p>

        <button className="btn btn-default" onClick={props.isCheckAll}>
          <i className={`fa ${checkAll}`}></i>
        </button>

        <button className="btn btn-default" onClick={props.markAsRead} disabled={disabled}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={props.marksAsUnread} disabled={disabled}>
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange={props.addLabels} disabled={disabled}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange={props.removeLabels} disabled={disabled}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={props.moveToTrash} disabled={disabled}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}
export default Toolbar
