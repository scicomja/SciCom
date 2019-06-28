import React from "react"
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	Alert
} from "reactstrap"
import PropTypes from "prop-types"
import { Formik } from "formik"
import * as Form from "./Form"
import ForgotPasswordPrompt from "./ForgotPasswordPrompt"
import EnterKeyListener from "../../../components/EnterKeyListener"

class LoginForm extends React.Component {
	static propTypes = {
		onLogin: PropTypes.func.isRequired,
		error: PropTypes.string.isRequired
	}
	constructor(props) {
		super(props)

		this.state = {
			isForgotPasswordPromptOpen: false
		}
	}

	toggleForgorPasswordPrompt() {
		this.setState({
			isForgotPasswordPromptOpen: !this.state.isForgotPasswordPromptOpen
		})
	}

	onEnter() {
		// hack here
		document.getElementById("login-button").click()
	}
	render() {
		return (
			<div className="center LoginRegisterBox" {...this.props}>
				<ForgotPasswordPrompt
					isOpen={this.state.isForgotPasswordPromptOpen}
					toggle={this.toggleForgorPasswordPrompt.bind(this)}
				/>

				<Card className="LoginRegisterCard">
					<CardBody style={style.container}>
						{this.props.error && (
							<Alert color="danger">{this.props.error}</Alert>
						)}

						<Formik
							ref={this.formRef}
							initialValues={Form.initialValues}
							validationSchema={Form.validationSchema}
							onSubmit={this.props.onLogin.bind(this)}>
							{({ submitForm, ...formikProps }) => (
								<div style={style.container}>
									<div style={style.formContainer}>
										<Form.FormGroup
											label="Username"
											name="username"
											placeholder="Benutzername"
											{...formikProps}
										/>
										<Form.FormGroup
											label="Password"
											name="password"
											placeholder="Passwort"
											type="password"
											{...formikProps}
										/>
									</div>
									<Button
										block
										id="login-button"
										style={style.loginButton}
										href="#"
										onClick={() => this.props.onLogin(formikProps.values)}>
										Login
									</Button>
									<Button
										onClick={this.toggleForgorPasswordPrompt.bind(this)}
										color="link">
										Passwort vegessen?
									</Button>
								</div>
							)}
						</Formik>
					</CardBody>
				</Card>
			</div>
		)
	}
}

export default EnterKeyListener(LoginForm)

const style = {
	title: {
		textAlign: "center"
	},

	container: {
		display: "flex",
		flexDirection: "column",
		flex: 1
	},
	formContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	card: {
		height: 400,
		width: 300
	}
}
