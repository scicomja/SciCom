import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormFeedback,
	FormGroup,
	Input,
	Button,
	Col,
	Label,
	Card,
	CardBody,
	Alert,
	Tooltip
} from "reactstrap"
import DatePicker from "react-datepicker"
import ChipsInput, { Chip } from "react-chips"
import "react-datepicker/dist/react-datepicker.css"
import { ReactstrapInput, ReactstrapSelect } from "reactstrap-formik"
import {
	ModalMode,
	ProjectNature,
	ProjectStatus,
	InitialProjectSearchPayload,
	ProjectSearchPayloadValidator
} from "../constants"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { createProject, modifyProject } from "../backend/user"
import { initialValues, validationSchema } from "../backend/project"
import { FormikInput } from "../utils/Form"
import QuestionCard from "./QuestionCard"
import QuickQuestionForm from "./QuickQuestionForm"
import Icon from "../components/icon"

import * as Yup from "yup"
import * as _ from "lodash"
import moment from "moment"

import * as ModalActions from "../actions/modal"

/*
  After some refactoring this component renders the project creation form only
*/
class MainModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			descriptionExplainationOpen: false,
			questionExplainationOpen: false,
			errorMessage: null,
			editingQuestion: null
		}
	}

	getHeader() {
		const { mode, content } = this.props
		if (content) return content.title // if it is editing something, the title should be used as header
		return mode == ModalMode.PROJECT_DETAILS
			? "Create a new project"
			: "Create a quick question"
	}

	addQuestion({ values, setFieldValue }) {
		const { editingQuestion: question } = this.state
		if (!question) return
		const key = "questions" // lest it change later
		setFieldValue(key, values[key].concat(question))
		// clear added question
		this.setState({ editingQuestion: null })
	}
	// remove questions with literally the same words
	removeQuestion({ question, values, setFieldValue }) {
		setFieldValue("questions", values.questions.filter(q => q != question))
	}
	// question is a string here, this renders a question
	questionCard(params) {
		return (
			<QuestionCard
				{...params}
				content={this.props.content}
				editingQuestion={this.state.editingQuestion}
				addQuestion={this.addQuestion.bind(this)}
				removeQuestion={this.removeQuestion.bind(this)}
				onEditQuestionChange={v =>
					this.setState({
						editingQuestion: v
					})
				}
			/>
		)
	}
	descriptionExplainIcon() {
		const { descriptionExplainationOpen } = this.state
		return (
			<div id="description-explanation-icon">
				<Icon name="question" />
				<Tooltip
					placement="right"
					isOpen={descriptionExplainationOpen}
					target="description-explanation-icon"
					toggle={() =>
						this.setState({
							descriptionExplainationOpen: !descriptionExplainationOpen
						})
					}>
					You must fill in at least the description of this project or a file
					describing it, or both.
				</Tooltip>
			</div>
		)
	}

	getForm() {
		const { mode, content } = this.props
		const { editingQuestion } = this.state
		const isOwner =
			!!content &&
			(content.creator && this.props.user._id == content.creator._id)
		const tomorrow = moment()
			.add(1, "day")
			.endOf("day")

		return (
			<Formik
				enableReinitialize
				initialValues={initialValues(content)}
				validationSchema={validationSchema}
				render={({
					values,
					isValid,
					errors,
					dirty,
					isSubmitting,
					handleChange,
					setFieldValue
				}) => (
					<Form>
						<Field
							name="title"
							label="Title"
							type="text"
							component={ReactstrapInput}
						/>
						<div style={style.descriptionFileGroup}>
							<Field
								type="textarea"
								label={
									<div style={style.descriptionLabel}>
										Description
										{this.descriptionExplainIcon()}
									</div>
								}
								name="description"
								component={ReactstrapInput}
							/>
							<div className="form-group" style={style.specialFormGroup}>
								<label for="file">File</label>
								<input
									type="file"
									name="file"
									onChange={e =>
										setFieldValue("file", e.currentTarget.files[0])
									}
								/>
							</div>
						</div>
						<FormGroup>
							<Label for="nature"> Project Type </Label>
							<Field
								name="nature"
								component={ReactstrapSelect}
								inputprops={{
									name: "nature",
									options: ProjectNature.slice(0, ProjectNature.length - 1) // no quick-question here
								}}
							/>
						</FormGroup>
						<FormGroup row>
							<Col style={style.specialFormGroup}>
								<Label for="from"> From </Label>
								<DatePicker
									name="from"
									autoComplete="off"
									selected={values.from}
									minDate={tomorrow.toDate()}
									onChange={e => {
										const date = moment(e)
											.startOf("day")
											.toISOString()
										setFieldValue("from", date)
									}}
								/>
								<ErrorMessage name="from" />
							</Col>

							<Col style={style.specialFormGroup}>
								<Label for="to"> To </Label> {"\n"}
								<DatePicker
									name="to"
									autoComplete="off"
									selected={values.to}
									minDate={moment(values.from)
										.add(1, "day")
										.toDate()}
									onChange={e => {
										const date = moment(e)
											.startOf("day")
											.toISOString()
										setFieldValue("to", e)
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
									value={values["tags"]}
									onChange={v => setFieldValue("tags", v)}
								/>
							</Col>
						</FormGroup>
						<Field
							label="Salary (€ per month)"
							type="number"
							name="salary"
							component={ReactstrapInput}
						/>
						<Label id="question-label">
							Questions
							<Icon name="question" />
							<Tooltip
								placement="right"
								isOpen={this.state.questionExplainationOpen}
								toggle={() =>
									this.setState({
										questionExplainationOpen: !this.state
											.questionExplainationOpen
									})
								}
								target="question-label">
								Fill in the questsion you would like the applicants to answer
								before they submit applications to this project. You cannot
								modify the questions of projects once they are created.
							</Tooltip>
						</Label>
						<Col>
							{values.questions.map((question, index) =>
								this.questionCard({
									question,
									index,
									values,
									setFieldValue // for removeing questions
								})
							)}
							{editingQuestion != null &&
								//Extra component for adding question
								this.questionCard({
									index: "question",
									values,
									setFieldValue,
									editing: true
								})}
						</Col>
						{// render "add question" button only when user is not adding
						editingQuestion == null && !content && (
							<Button
								style={style.addAQuestionButton}
								block
								onClick={() =>
									this.setState({
										editingQuestion: ""
									})
								}
								color="info">
								<Icon name="plus" /> Add a question
							</Button>
						)}
						<Button
							block
							disabled={
								isSubmitting || !_.isEmpty(errors) || !dirty || !isValid
							}
							type="submit"
							style={style.submitButton}>
							{!!content ? "Update" : "Submit"}
						</Button>
					</Form>
				)}
				onSubmit={this.onSubmitForm.bind(this)}
			/>
		)
	}

	async onSubmitForm(values, actions) {
		try {
			const { content } = this.props
			let project
			if (!content) {
				const payload = { ...values, status: "open" } // default value
				project = await createProject(payload, this.props.token)
			} else {
				const payload = { ...values, _id: content._id }
				project = await modifyProject(payload, this.props.token)
			}

			if (project.error) {
				this.setState({
					errorMessage: project.error
				})
			} else {
				this.props.close()
				window.location.reload()
			}
		} catch (err) {
			console.log(err)
		} finally {
			actions.setSubmitting(false)
		}
	}

	getQuickQuestionForm() {
		return (
			<QuickQuestionForm
				content={this.props.content}
				onSubmit={this.submitQuickQuestion.bind(this)}
			/>
		)
	}
	async submitQuickQuestion(values) {
		// fill out the missing info
		// copy the values out to prevent any unexpected modifications
		const { token, content } = this.props
		let finalForm = Object.assign({}, values)

		finalForm.questions = ["Your answer?"]
		finalForm.nature = "quick-question"

		let project
		if (!content) {
			finalForm.status = "open"
			project = await createProject(finalForm, token)
		} else {
			finalForm._id = content._id
			project = await modifyProject(finalForm, token)
		}

		if (project.error) {
			this.setState({
				errorMessage: project.error
			})
		} else {
			this.props.close()
			window.location.reload()
		}
	}

	render() {
		const { content, mode, close } = this.props
		const { errorMessage } = this.state
		return (
			<Modal isOpen={!!mode} toggle={close}>
				<ModalHeader toggle={close}>{this.getHeader()}</ModalHeader>
				<ModalBody>
					{errorMessage && <Alert color="danger">{errorMessage}</Alert>}
					{mode == ModalMode.QUICK_QUESTIONS
						? this.getQuickQuestionForm()
						: this.getForm()}
				</ModalBody>
			</Modal>
		)
	}
}

const style = {
	descriptionLabel: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	},
	specialFormGroup: {
		display: "flex",
		flexDirection: "column"
	},
	descriptionFileGroup: {
		border: "1px solid rgb(200,200,200)",
		borderRadius: 4,
		padding: 8
	},
	addAQuestionButton: {
		marginBottom: 16
	}
}
const mapStateToProps = state => ({
	...state.modal,
	...state.auth
})
const mapDispatchToProps = dispatch => ({
	close: () =>
		dispatch({
			type: ModalActions.SET_MODAL_TYPE,
			mode: null
		})
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(MainModal)
)
