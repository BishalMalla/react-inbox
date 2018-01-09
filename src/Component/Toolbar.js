import React from 'react'
const Toolbar = (props)=> {
  let checkAll = "fa-square-o"
  // if(props.messages.selected === true) {
  //   console.log('here')
  //   checkAll = "fa-check-square-o"
  // }
  // console.log(Array.isArray(props.messages))
  // if(props.messages[0].selected === true) {
  //   checkAll = "fa-check-square-o"
  // }
  let array = props.messages.filter(ele=> {
    return ele.selected
  })
  if(array.length === props.messages.length) {
    checkAll = "fa-check-square-o"
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

        <button className="btn btn-default">
          Mark As Read
        </button>

        <button className="btn btn-default">
          Mark As Unread
        </button>

        <select className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}
export default Toolbar
