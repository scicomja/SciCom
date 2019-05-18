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
import { login as Locale, common as CommonLocale } from "locale"
import PropTypes from "prop-types"
import * as _ from "lodash"

export default class RegisterForm extends React.Component {
	static propTypes = {
		mode: PropTypes.string.isRequired,
		toggle: PropTypes.func.isRequired,
		error: PropTypes.object.isRequired,
		submitForm: PropTypes.func.isRequired,
		formikProps: PropTypes.object.isRequired,
		isLogin: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)

		this.isLogin = props.isLogin
	}
	loginOrRegisterString() {
		return this.isLogin() ? Locale.login.de : Locale.register.de
	}
	getModeString() {
		switch (this.props.mode) {
			case Mode.REGISTER_PHD:
				return Locale.PHD.de
			case Mode.REGISTER_POLITICIAN:
				return Locale.politician.de
			default:
				return Locale.login.de
		}
	}

	getAlert() {
		const { error } = this.props
		if (!error) return null
		return <Alert color="danger">{error}</Alert>
	}
	getFields() {
		if (this.isLogin()) {
			return [
				{
					type: "text",
					fieldName: "username",
					placeholder: "username"
				},
				{
					type: "password",
					fieldName: "password",
					placeholder: "password"
				}
			]
		} else {
			return [
				{
					type: "text",
					fieldName: "username",
					placeholder: "username"
				},
				{
					type: "email",
					fieldName: "email",
					placeholder: "email"
				},
				{
					type: "password",
					fieldName: "password",
					placeholder: "password"
				},
				{
					type: "password",
					label: "Confirm Password",
					fieldName: "confirmPassword",
					placeholder: "Confirm Password"
				}
			]
		}
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
		// const { form } = CreateForm(fields)
		// return form
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
	render() {
		const { isSubmitting, submitForm, mode, toggle, formikProps } = this.props
		return (
			<div>
				<ModalHeader toggle={toggle}>{this.getModeString()}</ModalHeader>
				<ModalBody>
					{this.getAlert()}
					{this.getForm(formikProps)}
				</ModalBody>
				<ModalFooter>
					<Button
						color="primary"
						type="submit"
						onClick={submitForm}
						disabled={
							!formikProps.dirty ||
							!_.isEmpty(formikProps.errors) ||
							isSubmitting
						}>
						{this.loginOrRegisterString()}
					</Button>{" "}
					<Button color="secondary" onClick={toggle}>
						{CommonLocale.cancel.de}
					</Button>
				</ModalFooter>
			</div>
		)
	}
}