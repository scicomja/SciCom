import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import {
  Card, CardTitle, CardText,
  Button,
  Col,
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap'
import CenterNotice from '../../components/centerNotice'
import ProjectCard from '../../components/projectCard'
import UserChip from '../../components/userChip'
import { SearchMode } from '../../constants'
import {
  searchProject,
  searchUser
} from '../../backend/search'
import Icon from '../../components/icon'
import Avatar from '../../components/Avatar'
import * as SearchActions from '../../actions/search'

class SearchResultPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchMode: null,
      searchParams: null,
      results: [],
      page: 0, // pagination,
      total: 0
    }
  }
  async reloadSearchConfig({searchMode, searchParams}) {
    this.setState({
      searchMode, searchParams
    }, async () => {
      await this.goToPage(1)
    } )
    // then prepare the payload
    // copy the values, retrieve the right payload
    // await this.goToPage(1)
  }
  /*
    Explanation here:
      - When user searches, the form value stays in form.
      - When "Search" button in search modal is clicked, the form values will be stored in redux.
      - To prevent this component from changing while the user changes the mode,
        The redux states will be copied to the local state of this component.
        And the component is rendered according to the state instead of the props.
        Therefore "componentDidMount" copies the props to states by using "reloadSearchConfig",
      - Actual search (API call) is done in "reload search config"
      - When user starts to searchAgain, "componentDidMount" will not be called twice.
        But when he clicks submit new props will be received,
        Therefore reloading is also done in "componentWillReceiveProps"

  */
  componentDidMount() {
    // start the searching here
    const {searchMode, searchParams} = this.props
    if(!searchMode) {
      // what?!
      this.props.history.push('/user')
      return
    }
    this.reloadSearchConfig({searchMode, searchParams})
  }
  // this is needed as the page is not gonna reload when new search param comes
  componentWillReceiveProps(newProps) {
    const { searchMode: nextMode, searchParams: nextParams} = newProps
    const { searchMode, searchParams } = this.state
    // reload only if the search params has changed
    if (!_.isEqual(nextParams, searchParams)) {
      this.reloadSearchConfig({
        searchMode: nextMode,
        searchParams: nextParams})
    }
  }

  getSearchCriteriaCard() {
    const {
      searchMode,
      searchParams: allParams,
    } = this.state
    const {searchAgain} = this.props
    // get the suitable params for this search
    const searchParams = allParams[searchMode]
    const filterItem = (param, value) => (
      <div style={style.filterItem}>
        <div style={style.filterItemCell}>
          <Icon name={param} /> {_.startCase(param)}
        </div>
        {" "}
        <div style={style.filterItemCell}>
          {value}
        </div>
      </div>
    )
    if(!searchMode) return null
    return (
      <Card inverse color="secondary" style={style.filterCard}>
        <CardTitle>
          <Icon name="filter" /> Filters
        </CardTitle>
        <CardText>
          <div style={style.filterContainer}>
            {
              Object.keys(searchParams)
              .filter(p => !!searchParams[p])
              .map(p => filterItem(p, searchParams[p]))
            }
          </div>
        </CardText>
        <Col md="4">
          <Button onClick={() => searchAgain(searchParams)} color="primary">
            <Icon name="search" /> Search Again
          </Button>
        </Col>
      </Card>
    )
  }
  async goToPage(n) {
    const { page, searchParams, searchMode} = this.state
    const { token } = this.props
    const isSearchingProject = searchMode == SearchMode.PROJECT
    // launch search here
    // first pick the right function to call
    let searchFunc
    if (isSearchingProject) {
      searchFunc = searchProject
    } else {
      searchFunc = searchUser
    }
    let payload = _.omitBy(searchParams[searchMode], f => !f)
    if(!isSearchingProject) {
      // split out the call between politician and students.
      payload.isPolitician = searchMode ==  SearchMode.POLITICIAN
    }

    const {results, total} = await searchFunc(payload, token, n)
    this.setState({results, total, page: n})
  }

  getPaginationComponent() {
    const { results, total, page} = this.state
    if(!results || !results.length || total <= 1) return null
    console.log('get pagination', results, total, page)
    let listOfN = []
    for(let i = 1; i <= total; i++) listOfN.push(i)
    return (
      <Pagination>
        <PaginationItem previous disabled={page == 1}>
          <PaginationLink  onClick={() => this.goToPage(page - 1)}
            previous href="#" />
        </PaginationItem>
        {
          listOfN.map(n => (
            <PaginationItem
              onClick={() => this.goToPage(n)}
              active={n == page}>
              <PaginationLink href="#">
                {n}
              </PaginationLink>
            </PaginationItem>
          ))
        }
        <PaginationItem disabled={page == total}>
          <PaginationLink next href="#" onClick={() => this.goToPage(page + 1)}/>
        </PaginationItem>
      </Pagination>
    )
  }
  getSearchResultContainer() {
    const { results, searchMode } = this.state
    const {history} = this.props
    if(!searchMode || !results || !results.length) {
      return (
        <CenterNotice
          icon="search"
          title="No results"
          subtitle="Try lowering your search constraints"
        />
      )
    }
    if(searchMode == SearchMode.PROJECT) {
      return results.map(proj => (
        <ProjectCard project={proj} />
      ))
    } else {
      // users' search result
      return results.map(user => (
        <Card
          inverse body
          style={style.userCard}
          onClick={() => history.push(`/user/${user.username}`)}
          color="secondary">
          <CardTitle>
            <Icon name="user" />{' '}{user.username}
          </CardTitle>
          <CardText>
            <UserChip user={user} />
          </CardText>
        </Card>
      ))
    }

  }
  render() {
    const {searchMode, searchParams} = this.state
    if(!searchMode || !searchParams) {
      return null
    }
    return (
      <div style={style.container}>
        <h3>
          Search {_.startCase(searchMode.toLowerCase())} Result
        </h3>
        {this.getSearchCriteriaCard()}
        <div style={style.paginationContainer}>
          {this.getPaginationComponent()}
        </div>

        <div style={style.resultContainer}>
          {this.getSearchResultContainer()}
        </div>
      </div>

    )
  }
}

const style = {
  container: {
    margin: 16,
  },
  filterItem: {
    display: 'flex',
    margin: 16,
    width: '30%',
    maxWidth: '33%'
  },
  filterContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  userCard: {
    maxWidth: '40vw',
    width: '40vw',
    margin: 16
  }
}
const mapStateToProps = state => ({
  ...state.auth,
  ...state.search
})
const mapDispatchToProps = dispatch => ({
  searchAgain: (params) => {
    return dispatch({
      type: SearchActions.OPEN_SEARCH_MODAL,
      params
    })
  }
})
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps)(SearchResultPage)
)
