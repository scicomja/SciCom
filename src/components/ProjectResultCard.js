import React from "react"
import { formatDate } from "../utils"
import Highlighter from "react-highlight-words"
import Icon from "../components/icon"
import * as moment from "moment"

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

	timeDifferences(time) {
		const targetTime = moment(time)
		const now = moment()
		const diff = moment.duration(now.diff(targetTime))
		const formatNumber = num => Math.round(num)
		if (diff.asMonths() > 1) {
			return `vor ${Math.round(diff.asMonths())} Monaten`
		}
		if (diff.asDays() > 1) {
			return `vor ${Math.round(diff.asDays())} Tage`
		}
		if (diff.asHours() > 1) {
			return `vor ${Math.round(diff.asHours())} Stunden`
		}
		if (diff.asMinutes() > 1) {
			return `vor ${Math.round(diff.asMinutes())} Minuten`
		}
		return "Recently"
	}

	render() {
		const { project, onClick, highlight, isShowingLatest } = this.props
		return (
			<div
				style={{ ...style.container, ...this.extraStyle() }}
				onClick={onClick}
				onMouseLeave={() => this.setState({ isHovering: false })}
				onMouseOver={() => this.setState({ isHovering: true })}>
				{highlight ? (
					<Highlighter
						style={style.name}
						searchWords={highlight.split(" ")}
						autoEscape={true}
						highlightStyle={style.highlight}
						textToHighlight={project.title}
					/>
				) : (
					<h5 style={style.name}>{project.title}</h5>
				)}
				{isShowingLatest ? (
					<p>
						<Icon name="refresh" /> {this.timeDifferences(project.createdAt)}
					</p>
				) : (
					<p>
						{`${project.nature}, ${formatDate(project.from)} - ${formatDate(
							project.to
						)}`}
					</p>
				)}
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
