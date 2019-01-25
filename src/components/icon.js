import React from 'react'
export default function(props) {
  return (
    <i
      style={props.style}
      className={`fa fa-${props.name}`}
    ></i>
  )
}
