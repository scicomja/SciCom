import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CenterNotice from '../../components/centerNotice'
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
    console.log('home for user', user)
    return (
      <Container>
        <Row>
          <Col>
            <h3>Home</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <FrontPage
              user={user}
              isUserHimself={true}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  ...state.auth
})

export default withRouter(
  connect(mapStateToProps, null)(HomePage)
)
