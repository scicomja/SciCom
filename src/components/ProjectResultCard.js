import React from "react"
import { formatDate } from "../utils"
import Highlighter from "react-highlight-words"
import Icon from "../components/icon"
import * as moment from "moment"
import { getName } from "../utils/user"

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
				{isShowingLatest && (
					<p style={style.leftContainer}>
						<Icon name="refresh" /> {this.timeDifferences(project.createdAt)}
					</p>
				)}
				<div style={style.rightContainer}>
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
					<div style={style.detailContainer}>
						<div style={style.detailCell}>{project.nature}</div>
						<div style={style.detailCell}>
							{" "}
							{` ${formatDate(project.from)} - ${formatDate(project.to)}`}
						</div>
						<div style={style.detailCell}>Ansprechpartner</div>
						<div style={style.detailCell}>{getName(project.creator)}</div>
					</div>
					<p />
				</div>
			</div>
		)
	}
}

const style = {
	metaContainer: {
		display: "flex",
		flexDirection: "row"
	},
	name: {
		fontWeight: "bold"
	},
	highlight: {
		backgroundColor: "rgba(4,52,88, 0.8)",
		color: "white"
	},
	rightContainer: {
		display: "flex",
		flexDirection: "column",
		marginLeft: 8,
		flex: 8
	},
	leftContainer: {
		flex: 1
	},
	detailContainer: {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		width: "75%"
	},
	detailCell: {
		minWidth: "50%",
		flexGrow: 1
	},
	container: {
		backgroundColor: "rgb(187,187,189)",
		display: "flex",
		padding: 16,
		flexDirection: "row",
		cursor: "pointer",
		height: 132,
		width: "100%",
		marginTop: 8,
		marginBottom: 16
	}
}
