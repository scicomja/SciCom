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
import {
  ModalMode,
  ProjectNature,
} from './constants'
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik'
import { createProject } from './backend/user'
import {
  FormikInput
} from './utils/Form'

import * as Yup from 'yup'
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
  getForm() {
    const { mode, content } = this.props
    switch(mode) {
      case ModalMode.PROJECT_DETAILS:
        return (
          <Formik
            initialValues={content || initialFormValues.project}
            validationSchema={(validationSchema.project)}
            onSubmit={async (values, actions) => {
              try {
                let payload = {
                  ...values,
                  status: "open"
                }
                const project = await createProject(payload, this.props.token)
                this.props.close()
                window.location.reload()
              } catch(err) {
                console.log(err)
              } finally {
                actions.setSubmitting(false)
              }
            }}
          >
          {formComponent.project}
          </Formik>
        )
    }
  }
  render() {
    return (
      <Modal
        isOpen={!!this.props.mode}
        toggle={this.props.close}>
        <ModalHeader toggle={this.props.close}>
          {this.getHeader()}
        </ModalHeader>
        <ModalBody>
          {this.getForm()}
        </ModalBody>
      </Modal>
    )
  }
}

const initialFormValues = {
  project: {
    title: "",
    description: "",
    file: null,
    from: new Date(),
    to: new Date(),
    nature: ProjectNature[0],
    salary: 0,

  }
}

const formComponent = {
  project: ({errors, touched}) => (
    <Form>
      <FormikInput type="text" name="title" error={errors}/>
      <FormikInput type="text" name="description" error={errors} />
      <FormikInput type="file" name="file" error={errors} />
      <FormGroup>
        <Label for="nature"> Project Type </Label>
        <Field component="select" name="nature" >
          {ProjectNature.map((opt,i) => (
            <option
              selected={i == 0}
              value={opt}>
              {opt}
            </option>))}
        </Field>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Label for="from"> From </Label>
          <Input tag={Field} type="date" name="from" />
          <ErrorMessage name="from" />
        </Col>
        <Col>
          <Label for="to"> To </Label>
          <Input tag={Field} type="date" name="to" />
          <ErrorMessage name="to" />
        </Col>

      </FormGroup>

      <FormikInput type="number" name="salary" error={errors}/>
      <Button type="submit" color="primary"> Submit </Button>
    </Form>
  )
}

const validationSchema = {
  project: Yup.object().shape({
    title: Yup.string().required("Title is required"),
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
    salary: Yup.number().required("Salary information is required.")
  })
}
const mapStateToProps = state => ({
  ...state.modal,
  token: state.auth.token
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
