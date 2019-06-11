import React from "react"
import { formatDate } from "../utils"

export default class ProjectResultCard extends React.Component {
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
		const { project, onClick } = this.props
		// alert(`project ${JSON.stringify(project)}`)
		return (
			<div
				style={{ ...style.container, ...this.extraStyle() }}
				onClick={onClick}
				onMouseLeave={() => this.setState({ isHovering: false })}
				onMouseOver={() => this.setState({ isHovering: true })}>
				<h5 style={style.name}>{project.title}</h5>
				<p>
					{`${project.nature}, ${formatDate(project.from)} - ${formatDate(
						project.to
					)}`}
				</p>
			</div>
		)
	}
}

const style = {
	name: {
		fontWeight: "bold"
	},

	lowerRow: {},
	container: {
		backgroundColor: "rgb(187,187,189)",
		display: "flex",
		padding: 16,
		flexDirection: "column",
		cursor: "pointer",
		height: 96,
		width: "100%",
		marginTop: 8,
		marginBottom: 8
	}
}
