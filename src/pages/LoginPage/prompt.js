import React from 'react'
import {
  Alert,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button
} from 'reactstrap'
import { login as Locale, common as CommonLocale } from '../../locale'
import { Mode } from '../../constants'
import { CreateForm } from '../../utils/Form'
import { connect } from 'react-redux'
import * as Actions from '../../actions/auth'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

class Prompt extends React.Component {
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
    return this.props.mode === Mode.LOGIN
  }
  loginOrRegisterString() {
    return this.isLogin()?Locale.login.de:Locale.register.de
  }
  getFields() {
    let fields = [
      {
        type: 'username',
        fieldName: 'username',
        placeholder: 'username'
      },
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
    ]
    if(this.isLogin()) {
      // no email required for this login
      fields = fields.filter(f => f.type !== 'email')
    }
    return fields
  }
  getForm() {
    const fields = this.getFields()
    const { form } = CreateForm(fields)
    return form
  }
  submit() {
    const fields = this.getFields()
    const { getFormValues } = CreateForm(fields)
    const formValues = getFormValues()
    if(this.isLogin()) {
      this.props.login(formValues)
    } else {
      const isPolitician = this.props.mode === Mode.REGISTER_POLITICIAN
      // we are registering
      const payload = {
        ...formValues,
        isPolitician
      }
     const result = this.props.register(payload)

    }
  }
  getAlert() {
    const { error } = this.props
    if(!error) return null
    return (
      <Alert color="danger">
        {error}
      </Alert>
    )
  }
  toggle() {
    this.props.toggle()
    this.props.resetError()
  }
  render() {
    return (
      <Modal isOpen={this.props.mode} toggle={this.toggle.bind(this)}>
        <ModalHeader toggle={this.toggle.bind(this)}>{this.getModeString()}</ModalHeader>
        <ModalBody>
          {this.getAlert()}
          {this.getForm()}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.submit()}>{this.loginOrRegisterString()}</Button>{' '}
          <Button color="secondary" onClick={this.toggle.bind(this)}>{CommonLocale.cancel.de}</Button>
        </ModalFooter>
      </Modal>

    )
  }
}

const routedPrompt = withRouter(Prompt)
const mapStateToProps = state => ({
  error: state.auth.error
})
const mapDispatchToProps = dispatch => ({
  login: (credentials) => dispatch({
    type: Actions.LOGIN,
    ...credentials
  }),
  register: (payload) => dispatch({
    type: Actions.REGISTER,
    ...payload
  }),
  resetError: () => dispatch({
    type: Actions.SET_AUTH_ERROR,
    error: null
  })
})
export default connect(mapStateToProps, mapDispatchToProps)(routedPrompt)
