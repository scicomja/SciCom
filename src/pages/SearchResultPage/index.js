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
import { SearchMode } from "../../constants"
import { search } from "../../backend/search"
import Icon from "../../components/icon"
import Avatar from "../../components/Avatar"
import * as SearchActions from "../../actions/search"

import { toast } from "react-toastify"

import ResultsList from "./ResultsList"
import ProjectResultCard from "./ProjectResultCard"
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

	getSearchCriteriaCard() {
		const { searchAgain } = this.props
		// get the suitable params for this search
		return null
		// return (
		// 	<Card inverse color="secondary" style={style.filterCard}>
		// 		<CardTitle>
		// 			<Icon name="filter" /> Filters
		// 		</CardTitle>
		// 		<CardText>
		// 			<div style={style.filterContainer}>
		// 				{Object.keys(searchParams)
		// 					.filter(p => !!searchParams[p])
		// 					.map(p => filterItem(p, searchParams[p]))}
		// 			</div>
		// 		</CardText>
		// 		<Col md="4">
		// 			<Button onClick={() => searchAgain(searchParams)} color="primary">
		// 				<Icon name="search" /> Search Again
		// 			</Button>
		// 		</Col>
		// 	</Card>
		// )
	}
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

	getPaginationComponent() {
		return null
		// const { results, total, page } = this.state
		// if (!results || !results.length || total <= 1) return null
		// console.log("get pagination", results, total, page)
		// let listOfN = []
		// for (let i = 1; i <= total; i++) listOfN.push(i)
		// return (
		// 	<Pagination>
		// 		<PaginationItem previous disabled={page == 1}>
		// 			<PaginationLink
		// 				onClick={() => this.goToPage(page - 1)}
		// 				previous
		// 				href="#"
		// 			/>
		// 		</PaginationItem>
		// 		{listOfN.map(n => (
		// 			<PaginationItem onClick={() => this.goToPage(n)} active={n == page}>
		// 				<PaginationLink href="#">{n}</PaginationLink>
		// 			</PaginationItem>
		// 		))}
		// 		<PaginationItem disabled={page == total}>
		// 			<PaginationLink
		// 				next
		// 				href="#"
		// 				onClick={() => this.goToPage(page + 1)}
		// 			/>
		// 		</PaginationItem>
		// 	</Pagination>
		// )
	}
	getSearchResultContainer() {
		const { results, searchMode } = this.state
		const { history } = this.props

		if (searchMode == SearchMode.PROJECT) {
			return results.map(proj => <ProjectCard project={proj} />)
		} else {
			// users' search result
			return results.map(user => (
				<Card
					inverse
					body
					style={style.userCard}
					onClick={() => history.push(`/user/${user.username}`)}
					color="secondary">
					<CardTitle>
						<Icon name="user" /> {user.username}
					</CardTitle>
					<CardText>
						<UserChip user={user} />
					</CardText>
				</Card>
			))
		}
	}

	render() {
		const { form: { searchTerm, salary, date } = {} } = this.props
		const {
			results: { users: userResults = [], projects: projectResults = [] }
		} = this.state

		return (
			<div style={style.container}>
				<h3 style={style.header}>Suchergebnisse für "{searchTerm}"</h3>
				{this.getSearchCriteriaCard()}
				<div style={style.innerContainer}>
					<ResultsList title="Users" icon="user">
						{userResults.map(user => (
							<UserResultCard user={user} />
						))}
					</ResultsList>

					<ResultsList title="Projects" icon="gear">
						{projectResults.map(project => (
							<ProjectResultCard project={project} />
						))}
					</ResultsList>
				</div>
			</div>
		)
	}
}

const style = {
	container: {
		margin: 16
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
