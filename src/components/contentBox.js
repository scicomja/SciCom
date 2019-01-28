import React from 'react'
import Icon from './icon'
export default class ContentBox extends React.Component {
  render() {
      const { title, children, icon } = this.props
    return (
      <div style={{
          ...style.container,
          ...this.props.style}
        }>
        <div style={style.titleRow}>
          <Icon name={icon} />{' '}
          {title}
        </div>
        <div style={style.content}>
          {children}
        </div>
      </div>
    )
  }
}

const style = {
  container: {
    border: "1px solid black",
    display: 'flex',
    padding: 16,
    flexDirection: 'column',
    margin: 16
  },
  content: {
    padding: 16,
    flex: 1
  },
  titleRow: {
    height: 48,
  }
}
