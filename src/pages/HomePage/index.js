import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CenterNotice from '../../components/centerNotice'
import UserInfo from './UserInfo'
import {
  Button,
  Container, Row, Col
} from 'reactstrap'
import Section from './Section'
import FrontPage from './frontPage'
import {
  getProject,
  getApplications,
} from '../../backend/user'
import { CREATE_PROJECT } from '../../actions/modal'
import Icon from '../../components/icon'

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      extendedUser: {...props.user}
    }
  }
  async componentDidMount() {
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
    const { extendedUser: user } = this.state
    return (
      <div style={style.container}>
        <Container>

          <UserInfo
            user={user}
            onCreateProject={this.props.createProject}
            onEditInfo={null}
          />
          <FrontPage
            user={user}
            isUserHimself={true}
          />

        </Container>
      </div>
    )
  }
}
const style = {
  container: {
    marginTop: 16
  },
  createProjectContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}
const mapStateToProps = state => ({
  ...state.auth
})

const mapDispatchToProps = dispatch => ({
  createProject: () => dispatch({
    type: CREATE_PROJECT,
  })
})
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps)(HomePage)
)
