import React from "react"

import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import * as _ from "lodash"
import {
	Card,
	CardTitle,
	CardText,
	Button,
	Col,
	Pagination,
	PaginationItem,
	PaginationLink
} from "reactstrap"
import CenterNotice from "../../components/centerNotice"
import ProjectCard from "../../components/projectCard"
import UserChip from "../../components/userChip"
import { search } from "../../backend/search"
import Icon from "../../components/icon"
import Avatar from "../../components/Avatar"
import * as SearchActions from "../../actions/search"

import { toast } from "react-toastify"

import ResultsList from "./ResultsList"
import ProjectResultCard from "../../components/ProjectResultCard"
import UserResultCard from "./UserResultCard"

class SearchResultPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			results: {},
			page: 0, // pagination,
			total: 0
		}
	}

	componentDidMount() {
		// start the searching here
		this.goToPage(1)
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		const { form: prevForm } = prevProps
		if (!_.isEqual(this.props.form, prevForm)) {
			await this.goToPage(1)
		}
	}
	// this is needed as the page is not gonna reload when new search param comes

	async goToPage(n) {
		const { token, form } = this.props
		const { page } = this.state
		try {
			const results = await search(form, token, n)
			this.setState({ results, page: n })
		} catch (err) {
			toast.error("Error occurred while performing search.")
		}
	}

	render() {
		const { history, form: { searchTerm, salary, date } = {} } = this.props
		const {
			results: { users: userResults = [], projects: projectResults = [] }
		} = this.state

		return (
			<div style={style.container}>
				<h3 style={style.header}>Suchergebnisse für "{searchTerm}"</h3>
				<div style={style.innerContainer}>
					<ResultsList title="Users" icon="user">
						{userResults.map(user => (
							<UserResultCard
								onClick={() => history.push(`/user/${user.username}`)}
								user={user}
							/>
						))}
					</ResultsList>

					<ResultsList title="Projects" icon="gear">
						{projectResults.map(project => (
							<ProjectResultCard
								highlight={searchTerm}
								project={project}
								onClick={() => history.push(`/project/${project._id}`)}
							/>
						))}
					</ResultsList>
				</div>
			</div>
		)
	}
}

const style = {
	container: {
		margin: 16,
		flex: 1
	},
	header: {
		textAlign: "center"
	},
	innerContainer: {
		padding: 16
	},
	filterItem: {
		display: "flex",
		margin: 16,
		width: "30%",
		maxWidth: "33%"
	},
	filterContainer: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "flex-start"
		// alignItems: '',
	},
	paginationContainer: {
		height: 72
	},
	filterCard: {
		margin: 16,
		padding: 16
	},
	filterItemCell: {
		marginRight: 4
	},
	resultContainer: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},
	userCard: {
		maxWidth: "40vw",
		width: "40vw",
		margin: 16
	}
}
const mapStateToProps = state => ({
	...state.auth,
	...state.search,
	form: state.search.searchForm // alias
})
const mapDispatchToProps = dispatch => ({
	searchAgain: () =>
		dispatch({
			type: SearchActions.OPEN_SEARCH_MODAL
		})
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SearchResultPage)
)
