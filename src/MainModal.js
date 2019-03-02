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
  Col, Label,
  Card, CardBody
} from 'reactstrap'
import DatePicker from 'react-datepicker'
import ChipsInput, { Chip } from 'react-chips'
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

/*
  After some refactoring this component renders the project creation form only
*/
class MainModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editingQuestion: null
    }
  }

  getHeader() {
    switch(this.props.mode) {

      case ModalMode.PROJECT_DETAILS:
        if (this.props.content) {
          return this.props.content.title
        } else {
          return 'Create a new project'
        }
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
      questions: [],
      tags: []
    }
    const { from, to } = content
    const result = {
      tags: [], // to fill in the missing tags input for the previous records
      ...content,
      from: formatDate(from),
      to: formatDate(to)
    }
    return result
  }
  addQuestion({values, setFieldValue}) {
    const { editingQuestion: question } = this.state
    if(!question) return
    const key = 'questions' // lest it change later
    setFieldValue(key,values[key].concat(question))
    // clear added question
    this.setState({ editingQuestion: null})
  }
  // remove questions with literally the same words
  removeQuestion({question, values, setFieldValue}) {
    setFieldValue('questions',
      values.questions.filter(
        q => q != question
      )
    )
  }
  // question is a string here, this renders a question
  questionCard({
    question,
    index,
    values, setFieldValue,
    editing = false}) {
    return (
      <Card body inverse color="primary"
        style={style.questionCard}
        key={index}>
        {
          !editing && (
            <div style={style.questionCardContent}>
              <div style={{flex: 1}}>
                {question}
              </div>
              <Button
                color="danger"
                onClick={() =>
                  this.removeQuestion({
                    question, values, setFieldValue
                  })}
              >
                <Icon name="trash" />
                </Button>
            </div>
          )
        }
        {
          editing && (
            <CardBody>
              <input
                placeholder="Question to ask the applicants..."
                onChange={e => this.setState({
                  editingQuestion: e.currentTarget.value
                })}
              />
              <Button
                style={style.addQuestionComponent}
                onClick={() => this.addQuestion({
                  values, setFieldValue
                })}>
                Add
              </Button>
              <Button
                  style={style.addQuestionComponent}
                  onClick={() => this.setState({
                  editingQuestion: null
                })}>
                Cancel
              </Button>
            </CardBody>
          )
        }
      </Card>
    )
  }
  getForm() {
    const { mode, content } = this.props
    const isOwner = !!content && (content.creator && this.props.user._id == content.creator._id)
    const tomorrow = moment().add(1,'day').endOf('day')
    const { editingQuestion } = this.state
    switch(mode) {
      case ModalMode.PROJECT_DETAILS:
          return (
            <Formik
              enableReinitialize
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
                  .required("Invalid number"),
                questions: Yup.array().of(Yup.string())
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
                  <div className="form-group">
                    <label for="file">File</label>
                    <input type="file" name="file"
                      onChange={e => setFieldValue('file',
                        e.currentTarget.files[0]
                      )}
                    />
                  </div>
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
                  <FormGroup row>
                    <Col>
                      <Label for="tags">Tags</Label>
                        <Field
                          label="Tags"
                          name="tags"
                          component={ChipsInput}
                          value={values['tags']}
                          onChange={(v) => setFieldValue('tags',v)}
                        />
                    </Col>
                  </FormGroup>
                  <Field
                      label="Salary"
                      type="number"
                      name="salary"
                      component={ReactstrapInput}
                  />
                    <Label>Questions</Label>

                    <Col>
                      {
                        values.questions.map((question, index) => (
                          this.questionCard({
                            question, index,
                            values, setFieldValue // for removeing questions
                          })
                        ))
                      }
                      {
                        (editingQuestion != null) &&
                        //Extra component for adding question
                        this.questionCard({
                          index: "question",
                          values, setFieldValue,
                          editing: true
                        })
                      }
                    </Col>
                    {
                      // render "add question" button only when user is not adding
                      (editingQuestion == null) &&
                      (
                        <Button
                          block
                          onClick={() => this.setState({
                            editingQuestion: ""
                          })}
                          color="info">
                          <Icon name="plus" />
                          {' '}
                          Add a question
                        </Button>
                      )
                    }

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
    salary: Yup.number()
      .min(0, "Salary must be greater than 0")
      .required("Salary information is required."),
    questions: Yup.array().of(Yup.string())
  }),

}

const style = {
  questionCardContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  questionCard: {
    margin: 8
  },
  addQuestionComponent: {
    marginLeft: 8,
    marginRight: 8
  }
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
