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
import { login as Locale, common as CommonLocale } from "locale"
import { Mode } from "../../../constants"
import { CreateForm } from "utils/Form"
import { connect } from "react-redux"
import * as Actions from "actions/auth"
import { withRouter } from "react-router-dom"
import _ from "lodash"
import { Formik, Field, ErrorMessage } from "formik"
import RegisterForm from "./RegisterForm"
import EmailVerificationForm from "./EmailVerificationForm"
import * as Yup from "yup"

class Prompt extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isSubmitting: false,
			// values of the form
			values: {},
			// the email address awaiting for verification
			pendingEmailAddress: null
		}
	}

	isLogin() {
		return this.props.mode === Mode.LOGIN
	}

	getInitialFormValues() {
		if (this.isLogin()) {
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
		if (this.isLogin()) {
			return Yup.object().shape({
				username: Yup.string().required(),
				password: Yup.string().required()
			})
		} else {
			return Yup.object().shape({
				username: Yup.string().required(),
				password: Yup.string().required(),
				email: Yup.string()
					.email("Invalid email")
					.required(),
				confirmPassword: Yup.string()
					.oneOf([Yup.ref("password"), null], "Password does not match")
					.required()
			})
		}
	}

	handleFormChange(values) {
		this.setState({ values })
	}

	submit(values, { setSubmitting }) {
		if (this.isLogin()) {
			this.props.login(values)
		} else {
			const isPolitician = this.props.mode === Mode.REGISTER_POLITICIAN
			// we are registering
			const payload = {
				...values,
				isPolitician
			}
			// mark down the email address for email verification
			const { email } = values
			console.log("email in pending:", email)
			this.setState({ pendingEmailAddress: email })

			const result = this.props.register(payload)
		}
	}

	toggle() {
		this.props.toggle()
		this.props.resetError()
	}
	/**
		Trigger the code verification API call
	*/
	verify(code) {
		const { pendingEmailAddress: email } = this.state
		alert(email)
		this.props.verifyEmail({
			email,
			token: code
		})
	}
	render() {
		const { isVerifyingEmail } = this.props
		return (
			<Formik
				initialValues={this.getInitialFormValues()}
				validationSchema={this.getValidationSchema()}
				onSubmit={this.submit.bind(this)}>
				{({ submitForm, ...props }) => (
					<Modal isOpen={this.props.mode} toggle={this.toggle.bind(this)}>
						{isVerifyingEmail ? (
							<EmailVerificationForm
								verify={this.verify.bind(this)}
								onReturnToRegistration={this.props.onReturnToRegistration}
								toggle={this.toggle.bind(this)}
							/>
						) : (
							<RegisterForm
								isLogin={this.isLogin.bind(this)}
								isSubmitting={this.state.isSubmitting}
								formikProps={props}
								submitForm={submitForm}
								mode={this.props.mode}
								toggle={this.toggle.bind(this)}
								error={this.props.error}
							/>
						)}
					</Modal>
				)}
			</Formik>
		)
	}
}

const routedPrompt = withRouter(Prompt)
const mapStateToProps = state => ({
	error: state.auth.error,
	isVerifyingEmail: state.auth.isVerifyingEmail
})
const mapDispatchToProps = dispatch => ({
	login: credentials =>
		dispatch({
			type: Actions.LOGIN,
			...credentials
		}),
	register: payload =>
		dispatch({
			type: Actions.REGISTER,
			...payload
		}),
	resetError: () =>
		dispatch({
			type: Actions.SET_AUTH_ERROR,
			error: null
		}),
	onReturnToRegistration: () =>
		dispatch({
			type: Actions.LEAVE_EMAIL_VERIFICATION_MODE
		}),
	verifyEmail: ({ email, token }) =>
		dispatch({
			type: Actions.VERIFY_EMAIL,
			email,
			token
		})
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(routedPrompt)
