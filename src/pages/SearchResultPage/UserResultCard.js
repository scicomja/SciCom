import React from "react"
import { getName } from "../../utils/user"

export default class UserResultCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isHovering: false
		}
	}
	extraStyle() {
		const { isHovering } = this.state
		if (isHovering) {
			return {
				backgroundColor: "rgb(100,100,100)",
				color: "white"
			}
		} else {
			return {}
		}
	}
	render() {
		const { user, onClick } = this.props
		return (
			<div
				style={{ ...style.container, ...this.extraStyle() }}
				onClick={onClick}
				onMouseLeave={() => this.setState({ isHovering: false })}
				onMouseOver={() => this.setState({ isHovering: true })}>
				<h5 style={style.name}>{getName(user)}</h5>
				<p style={style.title}>
					{user.title},{user.state}
				</p>
			</div>
		)
	}
}

const style = {
	name: {
		fontWeight: "bold"
	},
	container: {
		backgroundColor: "rgb(187,187,189)",
		display: "flex",
		padding: 16,
		flexDirection: "column",
		cursor: "pointer",
		height: 96,
		width: "100%",
		marginTop: 8,
		marginBottom: 8,
		// shadows
		"-webkit-box-shadow": "6px 10px 25px 0px rgba(0,0,0,0.75)",
		"-moz-box-shadow": "6px 10px 25px 0px rgba(0,0,0,0.75)",
		"box-shadow": "6px 10px 25px 0px rgba(0,0,0,0.75)"
	}
}
