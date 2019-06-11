import React from 'react'
import Icon from '../../components/icon'
import {
  Row, Col
} from 'reactstrap'
export default class Section extends React.Component {

  render() {
    const {
      title,
      icon = null,
    } = this.props
    return (
      <Row>
        <Col>
          <div style={style.content}>
            <h3 style={style.contentHeader}>
              <b>
                { icon && <Icon name={icon}/> }
                {' '}
                {title}
              </b>
            </h3>
            {this.props.children}
          </div>
        </Col>
      </Row>
    )
  }
}

const style = {
  contentHeader: {
    width: '100%'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    margin: 16
  }
}
