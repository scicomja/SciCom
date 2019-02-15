import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import * as Yup from 'yup'

import Icon from '../../components/icon'
import * as AuthActions from '../../actions/auth'
import {
  Container, Row, Col, Button,
  FormGroup,
  Label,
} from 'reactstrap'
import {
  Formik, Form, Field,
  ErrorMessage
} from 'formik'
import { Persist } from 'formik-persist'

import ChipsInput, { Chip } from 'react-chips'
import {
  ReactstrapInput, ReactstrapSelect,
} from "reactstrap-formik"
import {
  FormikInput
} from '../../utils/Form'
import {
  germanStates
} from '../../constants'
import {
  updateUserInfo
} from '../../backend/user'
import { toast } from 'react-toastify'
import Avatar from 'react-avatar'

class EditInfoPage extends React.Component {
  constructor(props) {
    super(props)
    // fetch and populate form
    this.state = {
      initialValues: {}
    }
    const phoneRegex =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    this.rawSchema = {
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      phone: Yup.string()
        .matches(phoneRegex, "Phone number has invalid format")
        .required(),
      website: Yup.string(),
      linkedIn: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string()
        .oneOf(germanStates)
        .required(),
      title: Yup.string(),
      major: Yup.array().of(Yup.string()),
      university: Yup.string(),
      position: Yup.string()
        .min(5, "position too short")
    }
    this.validationSchema = Yup.object().shape(this.rawSchema)
  }
  componentDidMount() {
    console.log('user:', this.props.user)
    this.setState({
      initialValues: _.pick(
        this.props.user,
        Object.keys(this.rawSchema)
      )
    })

  }
  async updateInfo(values) {
    try {
      const result = await updateUserInfo(values, this.props.token)
      // update the sotre
      this.props.updateInfo(result)
      this.props.history.push('/')
    } catch(err) {
      toast.error(err.message)
    }

  }
  render() {
    const { initialValues } = this.state
    if(!initialValues) return null
    console.log('initial state', initialValues)
    const { isPolitician, email, username, avatar } = this.props.user

    return (
      <div style={style.container}>
        <Container>
          <Row>
            <Col>
              <h1 style={style.header}>
                <Icon name="edit" />
                {' '}
                Modify your info
              </h1>
            </Col>
          </Row>
          <Row style={style.basicContainer}>
            <Col md={2} style={style.nameComponent}>
              <Avatar size={96}
                round
              />
            </Col>
            <Col style={style.nameComponent}>
              <Row>
                <Col>
                  {username}
                </Col>
              </Row>
              <Row>
                <Col>
                  {email}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Formik
              initialValues={initialValues}
              validationSchema={this.validationSchema}
            >
            {
              ({
                values, errors, dirty,
                isValid, isSubmitting,
                setFieldValue, handleChange
              }) => (
                <Form>
                  <FormGroup row>
                    <Col>
                      <Field
                        name="firstName" label="First Name"
                        type="text" component={ReactstrapInput}
                      />
                    </Col>
                    <Col>
                      <Field
                        name="lastName" label="Last Name"
                        type="text" component={ReactstrapInput}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Field
                        name="phone" label="Phone"
                        type="text"
                        component={ReactstrapInput}
                      />
                    </Col>
                    <Col>
                      <Field
                        name="website" label="Website"
                        type="text"
                        component={ReactstrapInput}
                      />
                    </Col>
                    <Col>
                      <Field
                        name="linkedIn" label="LinkedIn"
                        type="text"
                        component={ReactstrapInput}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Field
                        label="State" name="state"
                        component={ReactstrapSelect}
                        inputprops={{
                          label: "State",
                          options: germanStates,
                        }}
                      />
                    </Col>
                    <Col>
                      <Field
                        name="city" label="City"
                        type="text" component={ReactstrapInput}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Field
                        label="CV" name="CV"
                        component={ReactstrapInput}
                        type="file"
                      />
                    </Col>
                    <Col>
                      <Field
                        label="Title" name="title"
                        component={ReactstrapInput}
                        type="text"
                      />
                    </Col>
                  </FormGroup>
                  {
                    !isPolitician && (
                      <FormGroup row>
                        <Col>
                          <Label for="major">Major</Label>
                          <Field
                            label="Major"
                            name="major"
                            component={ChipsInput}
                            value={values['major']}
                            onChange={(v) =>
                              setFieldValue('major', v)
                            }
                          />
                        </Col>
                        <Col>
                          <Field label="University"
                            name="university"
                            component={ReactstrapInput}
                            type="text"
                          />
                        </Col>
                      </FormGroup>
                    )
                  }
                  <Button
                    block
                    disabled={!isValid || !dirty}
                    onClick={() => this.updateInfo(values)}
                    color="primary">
                    Update
                  </Button>
                  <Persist name="personal-info" />
                </Form>
              )
            }
            </Formik>
          </Row>
        </Container>

      </div>
    )
  }
}

const style = {
  container: {
    margin: 16
  },
  header: {

  },
  basicContainer: {
    margin: 16,
  },
  nameComponent: {
    // display: 'flex',
    // textAlign: 'center'
  }
}
const mapStateToProps = state => ({
  ...state.auth
})

const mapDispatchToProps = dispatch => ({
  updateInfo: (info) => dispatch({
    type: AuthActions.UPDATE_USER_INFO,
    info
  })
})
export default withRouter(
  connect(mapStateToProps,mapDispatchToProps)(EditInfoPage)
)
