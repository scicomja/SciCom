import React from 'react'
import {
  Container, Col, Row
} from 'reactstrap'
import Icon from '../../components/icon'
export default class StatisticCell extends React.Component {
  render() {
    const {
      count,
      icon,
      name,
      style: customStyle = {}
    } = this.props
    return (
      <Container
        style={{...style.container, ...customStyle}}>
        <Row>
          <Col>
            <div style={style.count}>
              <h2><b>{ count }</b></h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={style.name}>
              <Icon name={icon} />
              {' '}
              {name}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const style = {
  container: {
    // margin: 16,
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  count: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
}
