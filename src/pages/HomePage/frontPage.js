import React from "react"
import CenterNotice from "../../components/centerNotice"
import { withRouter } from "react-router-dom"
import {
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Card,
	Button,
	CardTitle,
	CardText,
	Row,
	Col,
	Container
} from "reactstrap"
// import ProjectCard from '../../components/projectCard'
import ProjectCard from "../../components/ProjectResultCard"
import UserChip from "../../components/userChip"
import Icon from "../../components/icon"
import ApplicationCard from "./applicationCard"
import classnames from "classnames"
import Section from "./Section"
import Locale from "../../locale"

class FrontPage extends React.Component {
	constructor(props) {
		super(props)
		// for studnets only
		this.state = {
			activeTab: "bookmark"
		}
	}
	// politicians' components
	projectList(projects) {
		return projects.map(p => (
			<ProjectCard
				style={style.projectCard}
				project={p}
				key={p._id}
				onClick={() => this.props.history.push(`/project/${p._id}`)}
				isOwner={true}
			/>
		))
	}

	// studnets' components
	bookmarkTab(bookmarks) {
		if (!bookmarks || !bookmarks.length) {
			// return <CenterNotice title="No bookmarks found" />
			return null
		}
		return bookmarks.map(p => (
			<ProjectCard
				project={p}
				key={p._id}
				onClick={() => this.props.history.push(`/project/${p._id}`)}
				isOwner={false}
			/>
		))
	}
	applicationTab(applications) {
		if (!applications || !applications.length) {
			// return <CenterNotice title="No applications found" />
			return null
		}
		return applications.map(app => (
			<ProjectCard
				onClick={() => this.props.history.push(`/project/${app.project._id}`)}
				project={app.project}
				key={app.project._id}
			/>
		))
	}

	onGoingProjectsTab(projects) {
		if (!projects) return null
		const onGoingProjects = projects.filter(p => p.status == "active")

		return (
			<Section icon="project" title="Ongoing Projects">
				{this.projectList(onGoingProjects)}
			</Section>
		)
	}

	render() {
		const { isPolitician, bookmarks, applications, projects } = this.props.user
		const { isUserHimself } = this.props
		return (
			<div style={style.container}>
				<Container>
					{isPolitician && projects && (
						<Section title={Locale.homePage.project} icon="project">
							{this.projectList(projects)}
						</Section>
					)}
					{!isPolitician && bookmarks && isUserHimself && (
						<Section icon="bookmark" title={Locale.homePage.bookmarks}>
							{this.bookmarkTab(bookmarks)}
						</Section>
					)}
					{isUserHimself && (
						<Section icon="application" title={Locale.homePage.applications}>
							{this.applicationTab(applications)}
						</Section>
					)}
				</Container>
			</div>
		)
	}
}

export default withRouter(FrontPage)

const style = {
	container: {
		padding: 16
	},
	contentHeader: {
		width: "100%"
	},
	content: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-start",
		flexWrap: "wrap",
		margin: 16
	}
}
