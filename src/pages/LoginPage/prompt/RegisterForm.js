import React from "react"
import {
	Alert,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	FormGroup,
	Form,
	Label,
	Input,
	FormText,
	FormFeedback
} from "reactstrap"
import { Field, ErrorMessage } from "formik"
import { Mode } from "../../../constants"
import EnterKeyListener from "../../../components/EnterKeyListener"
import Locale from "../../../locale"
import PropTypes from "prop-types"
import * as _ from "lodash"

class RegisterForm extends React.Component {
	static propTypes = {
		mode: PropTypes.string.isRequired,
		toggle: PropTypes.func.isRequired,
		error: PropTypes.object.isRequired,
		submitForm: PropTypes.func.isRequired,
		formikProps: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props)
	}

	getFields() {
		return [
			{
				type: "text",
				label: "Benutzername",
				fieldName: "username",
				placeholder: "Benutzername"
			},
			{
				type: "email",
				label: "Bitte Passwort bestätigen",
				fieldName: "email",
				placeholder: "email"
			},
			{
				type: "password",
				label: "Bitte Passwort bestätigen",
				fieldName: "password",
				placeholder: "Passwort"
			},
			{
				type: "password",
				label: "Bitte Passwort bestätigen",
				fieldName: "confirmPassword",
				placeholder: "Confirm Password"
			}
		]
	}
	getForm({
		values,
		errors,
		setFieldValue,
		dirty,
		handleChange,
		handleSubmit
	}) {
		const fields = this.getFields()
		return (
			<Form onSubmit={handleSubmit}>
				{fields.map(({ type, fieldName, placeholder, label }) => (
					<FormGroup>
						<Label for={fieldName}>{label || _.startCase(fieldName)}</Label>
						<Input
							onChange={handleChange}
							placeholder={placeholder}
							tag={Field}
							name={fieldName}
							type={type}
							invalid={errors && errors[fieldName]}
						/>
						<ErrorMessage name={fieldName} />
					</FormGroup>
				))}
			</Form>
		)
	}

	onEnter() {
		this.props.submitForm()
	}

	render() {
		const {
			isSubmitting,
			submitForm,
			mode,
			toggle,
			formikProps,
			error
		} = this.props

		return (
			<div {...this.props}>
				<ModalHeader toggle={toggle}>
					{mode == Mode.REGISTER_POLITICIAN
						? Locale.registerForm.politicianTitle
						: Locale.registerForm.studentTitle}
				</ModalHeader>
				<ModalBody>
					{error && <Alert color="danger">{error}</Alert>}
					{this.getForm(formikProps)}
				</ModalBody>
				<ModalFooter>
					<Button
						type="submit"
						onClick={submitForm}
						disabled={
							!formikProps.dirty ||
							!_.isEmpty(formikProps.errors) ||
							isSubmitting
						}>
						{Locale.registerForm.register}
					</Button>{" "}
					<Button color="link" onClick={toggle}>
						{Locale.registerForm.cancel}
					</Button>
				</ModalFooter>
			</div>
		)
	}
}

export default EnterKeyListener(RegisterForm)
