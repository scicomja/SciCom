import React from "react"

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
	CardBody
} from "reactstrap"

import { Formik, Form, Field } from "formik"

import { ReactstrapInput } from "reactstrap-formik"

import * as Yup from "yup"
import * as _ from "lodash"

import Locale from "../../locale"

export default class ApplyApplicationPopup extends React.Component {
	constructor(props) {
		super(props)
	}
	getInitialValues(questions) {
		// collect initial answers to a single object,
		// with the question as key and answer as value
		const questionSet = questions
			.map(q => ({ [q]: "" }))
			.reduce((ans, part) => ({ ...ans, ...part }), {})
		return questionSet
	}
	getValidationSchema(questions) {
		const questionShape = questions.reduce(
			(shape, q) => ({
				...shape,
				[q]: Yup.string()
					.min(0)
					.required(Locale.applicationPopup.answerEmptyError)
			}),
			{}
		)
		return Yup.object().shape(questionShape)
	}
	render() {
		const {
			project: { questions, title } = { questions: null, title: null },
			onClose,
			isOpen,
			onSubmit
		} = this.props
		return (
			<Modal toggle={onClose} isOpen={isOpen}>
				<ModalHeader>{Locale.applicationPopup.title}</ModalHeader>
				<ModalBody>
					<Formik
						initialValues={this.getInitialValues(questions)}
						validationSchema={this.getValidationSchema(questions)}>
						{({ values, errors, setFieldValue, dirty, isSubmitting }) => {
							return (
								<Form>
									{questions.map(q => (
										<Field
											label={q}
											name={q}
											type="textarea"
											placeholder={
												Locale.applicationPopup.yourAnswerPlaceholder
											}
											component={ReactstrapInput}
										/>
									))}
									<Button
										disabled={!dirty || !_.isEmpty(errors) || isSubmitting}
										onClick={() => onSubmit(values)}
										color="success">
										{Locale.applicationPopup.submit}
									</Button>
								</Form>
							)
						}}
					</Formik>
				</ModalBody>
			</Modal>
		)
	}
}
