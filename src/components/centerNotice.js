import React from 'react'
import Icon from './icon'
export default function(props) {
  return (
    <div style={{...style.container, ...props.style}}>
      <h2>
        {props.icon && <Icon name={props.icon} />}
        {' '}
        <b>{props.title}</b>
      </h2>
      <h5> {props.subtitle} </h5>
    </div>
  )
}

const style = {
  container: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    width: '100%',
    height:'100%',
    flex: 1
  }
}
