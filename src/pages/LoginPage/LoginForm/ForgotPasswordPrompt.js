import React from "react"
import PropTypes from "prop-types"
import {
	Modal, ModalHeader, ModalFooter, ModalBody,
	FormGroup, Input, Alert, Label, Button
} from "reactstrap"

import { withRouter } from 'react-router-dom'
import { toast } from "react-toastify"

import { requestResetPasswordVerificationCode, verifyAndResetPassword } from "../../../backend/user"

class ForgorPasswordPrompt extends React.Component {
	static propTypes = {
		isOpen: PropTypes.bool.isRequired,
		toggle: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)
		this.defaultState = {
			beforeEmailSent: true,
			error: null,

			email: "",

			verificationCode: "",
			password: "",
			confirmPassword: ""
		}

		this.state = Object.assign({}, this.defaultState)
	}

	async requestVerificationCode() {
		const { email } = this.state
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if(!emailRegex.test(email.toLowerCase())) {
			this.setState({ error: "Invalid email address"})
			return false
		}
		try {
			await requestResetPasswordVerificationCode(email)
			return true
		} catch(err) {
			return false
		}
	}

	async submitResetPasswordRequest() {
		try {
			const response = await verifyAndResetPassword({
				...this.state,
				token: this.state.verificationCode
			})
			const { updated } = await response.json()
			return updated

		} catch(err) {
			alert(JSON.stringify(err))
			return false
		}
	}
	setError(error) {
		this.setState({ error })
	}

	isFormValid() {
		const { beforeEmailSent } = this.state
		if(beforeEmailSent) {
			return this.state.email.length > 0
		} else {
			const { email, verificationCode, password, confirmPassword } = this.state
			return verificationCode.length > 0 && password.length > 0 && password == confirmPassword
		}
	}

	setField(fieldName) {
		const value = document.getElementById(fieldName).value
		this.setState({ [fieldName]: value, error: null })
	}

	// function for proceeding to the next step
	async next() {
		if(this.state.beforeEmailSent) {
			const hasRequestCodeSent = await this.requestVerificationCode()
			if(hasRequestCodeSent) {
				this.setState({ beforeEmailSent: false, error: null })
			}

		} else {
			// TODO: submit the form
			const hasPasswordReset = await this.submitResetPasswordRequest()
			if(!hasPasswordReset) {
				this.setState({ error: "Cannot verify your token. Please close this popup and try again."})
				return
			}
			// close the popup after two seconds
			this.notifyResetSuccessAndClosePopup()
		}
	}
	notifyResetSuccessAndClosePopup() {
		const timeToClose = 3000
		toast.success(
			"The password of your account has been reset. You can now log in with your new credentials",
			{
				autoClose: timeToClose
			}
		)
		setTimeout(this.toggle.bind(this, true), timeToClose)

	}
	// the toClose flag indicates whether you want this popup to solely close
	toggle(toClose = false) {
		if(this.props.isOpen) {
			// clear the form before it is closed
			this.setState(this.defaultState)
		}
		// if the popup means to be closed, toggle only when it is still open
		this.props.toggle && this.props.toggle()


	}

	render() {
		const { beforeEmailSent, error } = this.state
		const { isOpen } = this.props
		return (
			<Modal isOpen={isOpen} toggle={this.toggle.bind(this)}>
				<ModalHeader>Reset your password </ModalHeader>
				<ModalBody>

					{error && <Alert color="danger">{error}</Alert> }

					<p>
						Enter your email address of the account which you have forgot its password to receive an verification code.
					</p>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input
							id="email"
							disabled={!beforeEmailSent}
							name="email"
							onChange={this.setField.bind(this, 'email')}
						/>
					</FormGroup>
					{!beforeEmailSent && (
							<div>
								<FormGroup>
									<Label for="verificationCode">Verfication Code</Label>
									<Input
										id="verificationCode"
										name="verificationCode"
										onChange={this.setField.bind(this, 'verificationCode')}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="password">Password</Label>
									<Input
										id="password"
										type="password"
										name="password"
										onChange={this.setField.bind(this, 'password')}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="confirmPassword">Confirm Password</Label>
									<Input
										id="confirmPassword"
										type="password"
										name="confirmPassword"
										onChange={this.setField.bind(this, 'confirmPassword')}
									/>
								</FormGroup>
							</div>
					)}
				</ModalBody>
				<ModalFooter>
					<Button onClick={this.next.bind(this)} disabled={!this.isFormValid()}>
						{ this.state.beforeEmailSent?"Request verification code":"Reset password"}
					</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

export default withRouter(ForgorPasswordPrompt)
