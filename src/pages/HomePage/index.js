import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import CenterNotice from "../../components/centerNotice"
import UserInfo from "./UserInfo"
import { Button, Container, Row, Col } from "reactstrap"
import Section from "./Section"
import FrontPage from "./frontPage"
import {
	getProject,
	getApplications,
	getUser,
	getProjectsOfUser
} from "../../backend/user"
import { CREATE_PROJECT, CREATE_QUICK_QUESTION } from "../../actions/modal"
import Icon from "../../components/icon"

class HomePage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			errors: null,
			extendedUser: { ...props.user }
		}
	}
	async componentDidMount() {
		// examine the path
		const pathComponents = this.props.location.pathname
			.split("/")
			.filter(comp => comp.length)

		if (pathComponents.length > 1) {
			// load other users
			const otherUsername = pathComponents[1]
			const otherUser = await getUser(otherUsername, this.props.token)
			// check the error from result
			if (otherUser.error) {
				this.setState({ errors: otherUser.error })
				return
			}
			if (otherUser.isPolitician) {
				const projects = await getProjectsOfUser(
					otherUsername,
					this.props.token
				)
				this.setState({
					extendedUser: { ...otherUser, projects }
				})
			} else {
				this.setState({
					extendedUser: otherUser
				})
			}

			return
		}

		const { isPolitician } = this.props.user
		// TODO: request search here
		const applications = await getApplications(this.props.token)
		this.setState({
			extendedUser: {
				...this.state.extendedUser,
				applications
			}
		})
		// additionally, if you are politician,
		// you get a list of projects you created
		if (isPolitician) {
			const projects = await getProject(this.props.token)
			this.setState({
				extendedUser: {
					...this.state.extendedUser,
					projects
				}
			})
		}
	}
	render() {
		const { errors, extendedUser: user } = this.state
		const isUserHimself = user.username == this.props.user.username
		return (
			<div style={style.container}>
				{!errors ? (
					<Container>
						<UserInfo
							user={user}
							onCreateProject={this.props.createProject}
							onCreateQuickQuestion={this.props.createQuickQuestion}
							isUserHimself={isUserHimself}
						/>
						<FrontPage user={user} isUserHimself={isUserHimself} />
					</Container>
				) : (
					<CenterNotice title="Error occured" />
				)}
			</div>
		)
	}
}
const style = {
	container: {
		marginTop: 16
	},
	createProjectContainer: {
		display: "flex",
		justifyContent: "flex-end"
	}
}
const mapStateToProps = state => ({
	...state.auth
})

const mapDispatchToProps = dispatch => ({
	createProject: () =>
		dispatch({
			type: CREATE_PROJECT
		}),
	createQuickQuestion: () =>
		dispatch({
			type: CREATE_QUICK_QUESTION
		})
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(HomePage)
)
