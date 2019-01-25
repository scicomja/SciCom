import React from 'react'

export default class ContentBox extends React.Component {
  render() {
    return (
      <div style={{
          ...style.container,
          ...this.props.style}
        }>
        <div style={style.titleRow}>
          {this.props.title}
        </div>
        <div style={style.content}>
          {this.props.children}
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
