import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CenterNotice from '../../components/centerNotice'
import {
  Button,
  Container, Row, Col
} from 'reactstrap'
import Section from './Section'

class HomePage extends React.Component {

  render() {
    const { isPolitician } = this.props.user
    return (
      <Container>
        <Row>
          <Col>
            
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  ...state.auth
})

export default withRouter(
  connect(mapStateToProps, null)(HomePage)
)
