import React from "react"
import { withRouter } from "react-router-dom"
import ProjectCard from "../../components/ProjectResultCard"
import { getLatestProjects } from "../../backend/user"
import { connect } from "react-redux"
class NewsPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			projects: [] // the fetched latest project
		}
	}

	async componentDidMount() {
		const { token } = this.props
		const projects = await getLatestProjects(token)
		this.setState({ projects })
	}

	render() {
		return (
			<div style={style.container}>
				<h2> Latest Projects</h2>
				{this.state.projects.map(project => (
					<ProjectCard
						onClick={() => this.props.history.push(`/project/${project._id}`)}
						project={project}
						isShowingLatest={true}
					/>
				))}
			</div>
		)
	}
}

const style = {
	container: {
		flex: 1,
		padding: 16
	}
}

const mapStateToProps = state => ({
	...state.auth
})

export default withRouter(
	connect(
		mapStateToProps,
		null
	)(NewsPage)
)
