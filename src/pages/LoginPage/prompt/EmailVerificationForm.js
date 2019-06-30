import React from "react"
import {
	Alert,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Button,
	FormGroup,
	Label,
	Input
} from "reactstrap"
import Icon from "components/icon"
import EnterKeyListener from "components/EnterKeyListener"
import Locale from "../../../locale"
import PropTypes from "prop-types"
import { Formik, Field, ErrorMessage } from "formik"

class EmailVerificationForm extends React.Component {
	static propTypes = {
		toggle: PropTypes.func.isRequired,
		onReturnToRegistration: PropTypes.func.isRequired,
		error: PropTypes.string
	}

	constructor(props) {
		super(props)

		this.state = {
			verificationCode: ""
		}
	}
	onEnter() {
		this.props.verify(this.state.verificationCode)
	}
	onCodeChange(e) {
		const verificationCode = document.getElementById("code").value
		this.setState({ verificationCode: verificationCode })
	}
	render() {
		const { toggle, onReturnToRegistration, verify, error } = this.props
		const { verificationCode } = this.state

		return (
			<div {...this.props}>
				<ModalHeader toggle={toggle}>
					{Locale.emailVerification.verifyEmailAddress}
				</ModalHeader>

				<ModalBody>
					<p>{Locale.emailVerification.description}</p>
					{error && (
						<Alert color="danger">
							{Locale.emailVerification.verificationCodeError}
						</Alert>
					)}
					<FormGroup horizontal>
						<Label for="code">
							{Locale.emailVerification.verificationCode}
						</Label>
						<Input
							id="code"
							name="code"
							onChange={this.onCodeChange.bind(this)}
						/>
					</FormGroup>
				</ModalBody>

				<ModalFooter style={style.buttonGroupContainer}>
					<Button onClick={onReturnToRegistration} color="link">
						<Icon name="arrow-left" />{" "}
						{Locale.emailVerification.returnToRegistration}
					</Button>

					<Button
						disabled={!verificationCode}
						onClick={() => verify(verificationCode)}>
						{Locale.emailVerification.verify}
					</Button>
				</ModalFooter>
			</div>
		)
	}
}

export default EnterKeyListener(EmailVerificationForm)

const style = {
	buttonGroupContainer: {
		justifyContent: "space-between"
	}
}
