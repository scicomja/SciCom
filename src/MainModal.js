import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
  FormGroup,
  Input,
  Button,
  Col, Label
} from 'reactstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import {
  ReactstrapInput,
  ReactstrapSelect,
} from "reactstrap-formik"
import {
  ModalMode,
  ProjectNature,
  ProjectStatus,
  InitialProjectSearchPayload,
  ProjectSearchPayloadValidator
} from './constants'
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik'
import {
  createProject,
  modifyProject
} from './backend/user'
import {
  FormikInput
} from './utils/Form'

import Icon from './components/icon'

import * as Yup from 'yup'
import * as _ from 'lodash'
import moment from 'moment'

import * as ModalActions from './actions/modal'

class MainModal extends React.Component {
  constructor(props) {
    super(props)

  }

  getHeader() {
    switch(this.props.mode) {
      case ModalMode.SEARCH_PROJECT:
        return "Search projects"
      case ModalMode.SEARCH_USER:
        return "Search users"
      case ModalMode.PROJECT_DETAILS:
        if (this.props.content) {
          return this.props.content.title
        } else {
          return 'Create a new project'
        }
      case ModalMode.USER_DETAILS:
        return "Update your profile"
      default:
        return ''
    }
  }
  prepareInitialValue(content) {
    // default values for new projects
    const formatDate = date => moment(date).startOf('day').toISOString()
    const tomorrow = moment().add(1,'day').endOf('day')
    const now = formatDate(tomorrow.toDate())
    if(!content) return {
      title: "",
      description: "",
      file: null,
      from: now,
      to: null,
      nature: ProjectNature[0],
      salary: 0,
    }
    const { from, to } = content
    const result = {
      ...content,
      file: null,
      from: formatDate(from),
      to: formatDate(to)
    }
    console.log('preparing to fill form with',result)
    return result
  }
  getForm() {
    const { mode, content } = this.props
    const isOwner = !!content && (content.creator && this.props.user._id == content.creator._id)
    const tomorrow = moment().add(1,'day').endOf('day')

    switch(mode) {
      // mode for modifying user info
      case ModalMode.USER_DETAILS:
          return null
      case ModalMode.PROJECT_DETAILS:
          return (
            <Formik
              initialValues={this.prepareInitialValue(content)}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .min(8, "Title is too short")
                  .required("Title is required"),
                nature: Yup.string()
                  .oneOf(ProjectNature, "Please select the nature of the project")
                  .required("Nature is required"),
                from: Yup.date()
                  .min(moment().startOf('day'), "Project cannot start from the past")
                  .required(),
                to: Yup.date().when("from", (from, schema) => {
                    return Yup.date().min(from)
                  }),
                salary: Yup.number()
                  .min(0, "Salary must be greater than 0")
                  .required("Invalid number")
              })}
              render={({
                values,
                isValid,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                setFieldValue}) => (
                <Form>
                  <Field name="title" label="Title" type="text"
                    component={ReactstrapInput}
                  />
                <Field type="textarea"
                      label="Description"
                      name="description"
                      component={ReactstrapInput}
                  />
                  <Field
                    label="File"
                    type="file"
                    name="file"
                    autoComplete="off"
                    component={ReactstrapInput}/>
                  <FormGroup>
                    <Label for="nature"> Project Type </Label>
                      <Field
                        label="Project Type"
                        name="nature"
                        component={ReactstrapSelect}
                        inputprops={{
                          name: "nature",
                          options: ProjectNature,
                        }}
                      />
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Label for="from"> From </Label>
                        <DatePicker
                          name="from"
                          autoComplete="off"
                          selected={values.from}
                          minDate={tomorrow.toDate()}
                          onChange={e => {
                            const date = moment(e).startOf('day').toISOString()
                            setFieldValue('from',date)
                          }}
                        />
                      <ErrorMessage name="from" />
                    </Col>
                    <Col>
                      <Label for="to"> To </Label> {'\n'}
                      <DatePicker
                        name="to"
                        autoComplete="off"
                        selected={values.to}
                        minDate={moment(values.from).add(1,'day').toDate()}
                        onChange={e => {
                          const date = moment(e).startOf('day').toISOString()
                          setFieldValue('to', e)
                          // setFieldValue('to',date)
                        }}
                      />
                      <ErrorMessage name="to" />
                    </Col>
                  </FormGroup>

                  <Field
                      label="Salary"
                      type="number"
                      name="salary"
                      component={ReactstrapInput}
                  />
                  <Button
                    disabled={isSubmitting || !_.isEmpty(errors) || !dirty || !isValid}
                    type="submit" color="primary">
                    Submit
                  </Button>
                  {' '}
                  {
                    content && (
                      <Button color="info">Mark as closed</Button>
                    )
                  }
                </Form>
              )}
              onSubmit={async (values, actions) => {
                try {
                  if(!content) {

                    const payload = {...values, status: 'open'} // default value
                    const project = await createProject(payload, this.props.token)
                  } else {
                    const payload = {...values, _id: content._id}
                    const project = await modifyProject(payload, this.props.token)
                  }
                  this.props.close()
                  window.location.reload()
                } catch(err) {
                  console.log(err)
                } finally {
                  actions.setSubmitting(false)
                }
              }}
            />
          )
    }
  }
  render() {
    const {content, mode, close} = this.props
    return (

      <Modal
        isOpen={!!mode}
        toggle={close}>
        <ModalHeader toggle={close}>
          {this.getHeader()}
        </ModalHeader>
        <ModalBody>
          {this.getForm()}
        </ModalBody>
      </Modal>
    )
  }
}


const validators = {
  project: Yup.object().shape({
    title: Yup.string()
      .min(8, "Title is too short")
      .required("Title is required"),
    from: Yup.date()
      .when("to", {
        is: to => !!to,
        then: (to, schema) => Yup.date().max(to, "From date must be before To")
      })
      .required("From date is required"),
    to: Yup.date(),
    // to: Yup.date().when("from", (from, schema) => (
    //   Yup.date().min(from, "To date must be after From")
    // )),
    salary: Yup.number()
      .min(0, "Salary must be greater than 0")
      .required("Salary information is required.")
  }),

}
const mapStateToProps = state => ({
  ...state.modal,
  ...state.auth
})
const mapDispatchToProps = dispatch => ({
  close: () => dispatch({
    type: ModalActions.SET_MODAL_TYPE,
    mode: null
  })
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainModal)
)
