import React, { Component } from "react"
import { Jumbotron, Button, Container, Row, Col } from "reactstrap"
import { login as Locale } from "../../locale"
import * as Actions from "actions/auth"

import { Mode } from "../../constants"
import Prompt from "./prompt"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import RegisterCard from "./RegisterCard"
import LoginForm from "./LoginForm/index.js"

class LoginPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			mode: null
		}
	}
	register(asPolitician) {
		this.setState({
			mode: asPolitician ? Mode.REGISTER_POLITICIAN : Mode.REGISTER_PHD
		})
	}

	render() {
		// redirect to user page when he has logged in
		if (this.props.user) {
			this.props.history.push("/user")
			return null
		}
		return (
			<div className="page center">
				{/* This prompt is for login AND register */}
				<Prompt
					toggle={() => this.setState({ mode: null })}
					mode={this.state.mode}
				/>
				<Container style={style.container}>
					<Row className="LoginRegisterRow">
						<Col style={style.fill}>
							<LoginForm error={this.props.error} onLogin={this.props.login} />
						</Col>
						<Col style={style.fill}>
							<RegisterCard
								onRegisterPolitician={() => this.register(true)}
								onRegisterStudent={() => this.register(false)}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

const style = {
	fill: {
		minWidth: 300,
		display: "flex",
		flex: 1
	},
	loginColumn: {
		textAlign: "center",
		marginTop: 32
	},
	loginContainer: {
		flexDirection: "column",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	loginButton: {
		// marginLeft: 16
	},
	container: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center"
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
	error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
	login: credentials =>
		dispatch({
			type: Actions.LOGIN,
			...credentials
		})
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(LoginPage)
)
