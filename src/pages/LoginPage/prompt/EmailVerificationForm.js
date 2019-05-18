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
import PropTypes from "prop-types"
import { Formik, Field, ErrorMessage } from "formik"

export default class EmailVerificationForm extends React.Component {
	static propTypes = {
		toggle: PropTypes.func.isRequired,
		onReturnToRegistration: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)

		this.state = {
			verificationCode: ""
		}
	}
	onCodeChange(e) {
		const verificationCode = document.getElementById("code").value
		this.setState({ verificationCode: verificationCode })
	}
	render() {
		const { toggle, onReturnToRegistration, verify } = this.props
		const { verificationCode } = this.state

		return (
			<div>
				<ModalHeader toggle={toggle}>Verify your email address</ModalHeader>

				<ModalBody>
					<p>
						Enter the code in the email address we have sent you to complete the
						registration.
					</p>
					<FormGroup horizontal>
						<Label for="code"> Verification Code: </Label>
						<Input
							id="code"
							name="code"
							onChange={this.onCodeChange.bind(this)}
						/>
					</FormGroup>
				</ModalBody>

				<ModalFooter style={style.buttonGroupContainer}>
					<Button onClick={onReturnToRegistration} color="link">
						<Icon name="arrow-left" /> Return to Registration
					</Button>

					<Button
						disabled={!verificationCode}
						onClick={() => verify(verificationCode)}>
						Verify
					</Button>
				</ModalFooter>
			</div>
		)
	}
}

const style = {
	buttonGroupContainer: {
		justifyContent: "space-between"
	}
}
