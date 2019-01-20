import React from 'react'
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button
} from 'reactstrap'
import { login as Locale, common as CommonLocale } from '../../locale'
import { Mode } from '../../constants'
import { CreateForm } from '../../utils/Form'
import { login as requestLogin } from './backend'
import { connect } from 'react-redux'
import * as Actions from '../../action'
import { withRouter } from 'react-router-dom'

class Prompt extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        email: "",
        password: ""
      }
    }
  }
  getModeString() {
    switch(this.props.mode) {
      case Mode.REGISTER_PHD:
        return Locale.PHD.de
      case Mode.REGISTER_POLITICIAN:
        return Locale.politician.de
      default:
        return Locale.login.de
    }
  }
  isLogin() {
    return this.props.mode === Mode.REGISTER_PHD || this.props.mode === Mode.REGISTER_POLITICIAN
  }
  loginOrRegisterString() {
    return this.isLogin()?Locale.login.de:Locale.register.de
  }
  getForm() {
    return CreateForm([
      {
        type: 'email',
        fieldName: 'email',
        placeholder: 'email'
      },
      {
        type: 'password',
        fieldName: 'password',
        placeholder: 'password'
      }
    ])
  }
  submit() {
    // TODO: remove hardcode
    let payload = {
      ...this.state.form
    }
    switch(this.props.mode) {
      case Mode.REGISTER_PHD:
        payload.type = "PHD"
        break
      case Mode.REGISTER_POLITICIAN:
        payload.type = "politician"
        break
      default:
        break
    }
    requestLogin(null,null).then(res => {
      this.props.toContentPage(this.props.mode === Mode.REGISTER_POLITICIAN)
    }).then(() => {
      // redirect to content page
        this.props.history.push(`/user/johndoe`)
    })
  }
  render() {
    return (
      <Modal isOpen={this.props.mode} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{this.getModeString()}</ModalHeader>
        <ModalBody>
          {this.getForm()}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.submit()}>{this.loginOrRegisterString()}</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>{CommonLocale.cancel.de}</Button>
        </ModalFooter>
      </Modal>

    )
  }
}

const routedPrompt = withRouter(Prompt)
const mapDispatchToProps = dispatch => ({
  toContentPage: () => dispatch({
    type: Actions.LOGIN
  })
})
export default connect(null,mapDispatchToProps)(routedPrompt)
