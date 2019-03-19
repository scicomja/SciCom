import React from 'react'
import {
  Alert,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button,
  FormGroup, Form, Label, Input, FormText, FormFeedback
} from 'reactstrap'
import { login as Locale, common as CommonLocale } from '../../locale'
import { Mode } from '../../constants'
import { CreateForm } from '../../utils/Form'
import { connect } from 'react-redux'
import * as Actions from '../../actions/auth'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import {
  Formik, Field, ErrorMessage
} from 'formik'
import * as Yup from 'yup'


class Prompt extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSubmitting: false,
      // values of the form
      values: {}
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
    return this.props.mode === Mode.LOGIN
  }
  loginOrRegisterString() {
    return this.isLogin()?Locale.login.de:Locale.register.de
  }
  getInitialFormValues() {
    if(this.isLogin()) {
      return {
        username: "",
        password: ""
      }
    } else {
      return {
        username: "",
        password: "",
        email: "",
        confirmPassword: ""
      }
    }
  }

  getValidationSchema() {
    if(this.isLogin()) {
      return Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required()
      })
    } else {
      return Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
        email: Yup.string().email("Invalid email").required(),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], "Password does not match")
          .required()
      })
    }
  }
  getFields() {
    if(this.isLogin()) {
      return [
        {
          type: 'text',
          fieldName: 'username',
          placeholder: 'username'
        },
        {
          type: 'password',
          fieldName: 'password',
          placeholder: 'password'
        }
      ]
    } else {
      return [
        {
          type: 'text',
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
        },
        {
          type: 'password',
          label: 'Confirm Password',
          fieldName: 'confirmPassword',
          placeholder: 'Confirm Password'
        }
      ]
    }
  }
  handleFormChange(values ) {
    console.log(`form change`, values)
    this.setState({ values })
  }
  getForm({
    values, errors, setFieldValue, dirty, handleChange, handleSubmit
  }) {
    const fields = this.getFields()
    // const { form } = CreateForm(fields)
    // return form
    return (
      <Form onSubmit={handleSubmit}>
        {
          fields.map(({type, fieldName, placeholder, label}) => (
            <FormGroup>
              <Label for={fieldName}>{label || _.startCase(fieldName)}</Label>
              <Input
                onChange={handleChange}
                placeholder={placeholder}
                tag={Field}
                name={fieldName}
                type={type}
                invalid={errors && errors[fieldName]} />
              <ErrorMessage name={fieldName} />
            </FormGroup>
          ))
        }
      </Form>
    )
  }
  submit(values, { setSubmitting }) {
    console.log(`submit values`, values)
    if(this.isLogin()) {
      this.props.login(values)
    } else {
      const isPolitician = this.props.mode === Mode.REGISTER_POLITICIAN
      // we are registering
      const payload = {
        ...values,
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
      <Formik
          initialValues={this.getInitialFormValues()}
          validationSchema={this.getValidationSchema()}
          onSubmit={this.submit.bind(this)}
      >
        {
          ({ submitForm, ...props}) => (
            <Modal isOpen={this.props.mode} toggle={this.toggle.bind(this)}>
              <ModalHeader toggle={this.toggle.bind(this)}>{this.getModeString()}</ModalHeader>
              <ModalBody>
                {this.getAlert()}
                {this.getForm(props)}
              </ModalBody>
              <ModalFooter>
                <Button color="primary"
                  type="submit"
                  onClick={submitForm}
                  disabled={!props.dirty || !_.isEmpty(props.errors) || this.state.isSubmitting}
                >
                  {this.loginOrRegisterString()}
                </Button>
                {' '}
                <Button color="secondary" onClick={this.toggle.bind(this)}>
                  {CommonLocale.cancel.de}
                </Button>
              </ModalFooter>
            </Modal>
          )
        }
      </Formik>


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
