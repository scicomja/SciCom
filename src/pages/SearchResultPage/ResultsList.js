import React from "react"
import PropTypes from "prop-types"
import ProjectResultCard from "./ProjectResultCard"
import UserResultCard from "./UserResultCard"
import Icon from "../../components/icon"
import CenterNotice from "../../components/centerNotice"

export default class ResultsList extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired
	}

	render() {
		const { title, icon, children = [] } = this.props
		const isEmpty = children.length == 0
		return (
			<div style={style.container}>
				<div style={style.headerRow}>
					<Icon name={icon} style={style.icon} />{" "}
					<h3 style={style.headerText}>{title}</h3>
				</div>
				<div style={style.resultsContainer}>
					{!isEmpty ? children : <CenterNotice title="No results" />}
				</div>
			</div>
		)
	}
}

const style = {
	container: {
		display: "flex",
		flexDirection: "column",
		marginTop: 16,
		marginBottom: 16
	},
	icon: {
		fontSize: 32,
		marginRight: 16
	},
	resultsContainer: {
		display: "flex",
		flexDirection: "column"
	},
	headerRow: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	headerText: {
		fontWeight: "bold"
	}
}
