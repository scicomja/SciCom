import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class SearchResultPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return null
  }
}


const mapStateToProps = state => ({
  ...state.auth
})
const mapDispatchToProps = dispatch => ({

})
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps)(SearchResultPage)
)
