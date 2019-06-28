import React from "react"
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button
} from "reactstrap"
import PropTypes from "prop-types"
import Locale from "../../locale"

export default class RegisterCard extends React.Component {
	static propTypes = {
		onRegisterPolitician: PropTypes.func.isRequired,
		onRegisterStudent: PropTypes.func.isRequired
	}
	render() {
		return (
			<div className="center LoginRegisterBox">
				<Card className="LoginRegisterCard">
					<CardTitle style={style.title}>{Locale.registerForm.title}</CardTitle>
					<div style={style.buttonContainer}>
						<Button
							style={style.button}
							block
							onClick={this.props.onRegisterPolitician}>
							{Locale.registerForm.politicianTitle}
						</Button>
					</div>
					<div style={style.buttonContainer}>
						<Button
							style={style.button}
							block
							onClick={this.props.onRegisterStudent}>
							{Locale.registerForm.studentTitle}
						</Button>
					</div>
				</Card>
			</div>
		)
	}
}

const style = {
	buttonContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		margin: 8,
		marginLeft: 16,
		marginRight: 16
	},
	button: {
		// flex: 1
	},
	card: {
		height: 400,
		width: 300,
		display: "flex",
		flexDirection: "column",
		padding: 16
	},
	title: {
		textAlign: "center"
	}
}
