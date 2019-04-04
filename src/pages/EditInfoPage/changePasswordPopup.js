import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label, Input,
  Alert
} from 'reactstrap'
import PropTypes from 'prop-types'
import Icon from '../../components/icon'
import {
  Formik, Form, Field, ErrorMessage
} from 'formik'
import {
  ReactstrapInput
} from 'reactstrap-formik'
import * as Yup from 'yup'
import * as _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { changePassword } from '../../backend/user'

class ChangePasswordPopup extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    // token for credentials
    token: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props)

    this.state = {
      // error message received from the server
      error: ''
    }

    this.initialValues = {
      originalPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
    this.validationSchema = Yup.object().shape({
      originalPassword: Yup.string().required("Required Field"),
      newPassword: Yup.string().required("Required Field"),
      confirmPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], "Password does not match")
          .required("Required Field")
    })

    this.labels = {
      originalPassword: "Old Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
    }
  }
  async submitForm(form) {
    const { token } = this.props
    const { error } = await changePassword(form, token)
    if(error) {
      this.setState({
        error
      })
    } else {
      window.location.reload()
    }
  }
  render() {
    const { visible, onClose} = this.props
    const { error } = this.state
    const { initialValues, validationSchema } = this
    return (
      <Modal isOpen={visible} toggle={onClose}>
        <ModalHeader>
          Change Your Password
        </ModalHeader>
        <ModalBody>
          {
            error && (
              <Alert color="danger">
                {error}
              </Alert>
            )
          }
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {
              ({
                values, errors, dirty, isValid,
                setFieldValue,
              }) => {
                return (
                  <Form>
                    {
                      Object.keys(this.labels)
                        .map(name => (
                          <FormGroup key={name}>
                            <Label for={name}>
                              {this.labels[name]}
                            </Label>
                            <Input
                              type="password"
                              name={name}
                              tag={Field}
                              inValid={errors && errors[name]}
                            />
                            <ErrorMessage name={name} />
                          </FormGroup>
                        ))
                    }
                    <div style={style.buttonGroup}>
                      <Button
                        type="submit"
                        disabled={!_.isEmpty(errors) || !dirty }
                        onClick={this.submitForm.bind(this,values)}
                        color="primary" style={style.changePasswordButton}>
                        Change Password
                      </Button>
                      <Button onClick={onClose}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )
              }
            }
          </Formik>
        </ModalBody>
      </Modal>
    )
  }
}
const style = {
  changePasswordButton: {
    marginRight: 8
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
}
const mapStateToProps = state => ({...state.auth})
export default withRouter(
  connect(mapStateToProps, null)(ChangePasswordPopup)
)
