import React from 'react'
import { Icon } from '../constants'
export default function(props) {
  const name = Icon[props.name]?Icon[props.name]:props.name
  return (
    <i
      style={props.style}
      className={`fa fa-${name}`}
    ></i>
  )
}
