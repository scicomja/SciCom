import React, { Component } from 'react';
import {
  Jumbotron, Button,
  Container, Row, Col,
} from 'reactstrap'
import LoginCard from './LoginCard'
import {login as Locale} from '../../locale'
import { Mode } from '../../constants'
import Prompt from './prompt'

export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: null
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
            />
          </Col>
          <Col>
            <LoginCard
              text={Locale.PHD.de}
              buttonText={Locale.register.de}
              onClick={() => this.register(false)}
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
    // h
  }
}
