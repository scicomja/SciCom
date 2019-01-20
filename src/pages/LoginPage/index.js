import React, { Component } from 'react';
import {
  Jumbotron, Button,
  Container, Row, Col,
} from 'reactstrap'
import LoginCard from './LoginCard'
import {login as Locale} from '../../locale'
import { Mode } from '../../constants'
import Prompt from './prompt'
import { withRouter } from 'react-router-dom'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: null
    }
    if(!props.user) {
      return
    }
  }
  register(asPolitician) {
    this.setState({
      mode: asPolitician?Mode.REGISTER_POLITICIAN:Mode.REGISTER_PHD
    })
  }
  login() {
    this.setState({
      mode: Mode.LOGIN
    })
  }

  normalMode() {
    this.setState({
      mode: null
    })
  }
  render () {
    return (
      <div className="page center">
      {/* This prompt is for login AND register */}
      <Prompt
        toggle={() => this.setState({mode: null})}
        mode={this.state.mode} />
      <Container>
        <Row>
          <Col>
            <LoginCard
              text={Locale.politician.de}
              buttonText={Locale.register.de}
              onClick={() => this.register(true)}
              isPolitician={true}
            />
          </Col>
          <Col>
            <LoginCard
              text={Locale.PHD.de}
              buttonText={Locale.register.de}
              onClick={() => this.register(false)}
              isPolitician={false}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={style.loginColumn}>
              {Locale.hasAnAccount.de}
              <a onClick={() => this.login()}> {Locale.login.de} </a>
            </div>
        </Col>
        </Row>
      </Container>
      </div>
    )
  }
}

const style = {
  loginColumn: {
    textAlign: 'center',
    marginTop: 32
  },
  container: {
  }
}

export default withRouter(LoginPage)
