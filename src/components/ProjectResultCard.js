import React from "react"
import { formatDate } from "../utils"
import Highlighter from "react-highlight-words"

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
		const { project, onClick, highlight } = this.props
		// alert(`project ${JSON.stringify(project)}`)
		return (
			<div
				style={{ ...style.container, ...this.extraStyle() }}
				onClick={onClick}
				onMouseLeave={() => this.setState({ isHovering: false })}
				onMouseOver={() => this.setState({ isHovering: true })}>
				{highlight ? (
					<Highlighter
						style={style.name}
						searchWords={[highlight]}
						autoEscape={true}
						highlightStyle={style.highlight}
						textToHighlight={project.title}
					/>
				) : (
					<h5 style={style.name}>{project.title}</h5>
				)}

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
	highlight: {
		backgroundColor: "rgba(4,52,88, 0.8)",
		color: "white"
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
