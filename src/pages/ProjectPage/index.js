import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Avatar from 'react-avatar'
import ApplicationCard from './applicationCard'
import { serverURL } from '../../constants'
import { toast } from 'react-toastify'
import {
  Container, Row, Col,
  Card, CardText, CardTitle,
  Button,
  Badge,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading, ListGroupItemText
} from 'reactstrap'
import {
  getProjectById,
  closeProject,
  openProject,
  applyProject
} from '../../backend/user'
import { authorizedRequestGet } from '../../utils/requests'
import ProjectStatusBadge from '../../components/projectStatusBadge'
import Icon from '../../components/icon'
import * as ModalActions from '../../actions/modal'
import ContentBox from '../../components/contentBox'
import moment from 'moment'
import * as _ from 'lodash'
/*
  Display details of the project
  for politician:
    - close project
    - see list of applications
    - modify project info
    - accept / reject applications (popup)
*/
class ProjectPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: null,
      isOwner: false
    }
  }

  async componentDidMount() {
    // find and populate the project info
    const { project_id } = this.props.match.params
    const { token, user } = this.props
    try {
      let project = await getProjectById(project_id, token)
      if(!project) {
        this.props.history.push('/')
        return
      }
      this.setState({
        project,
        isOwner: project.creator._id == user._id
      })
    } catch(err) {
      console.log(err)
      this.props.history.push('/')
    }
  }
  formatDate(date) {
    return moment(date).startOf('day').format("MMM Do, YYYY")
  }
  editProject() {
    this.props.editProject(this.state.project)
  }
  async closeProject() {
    const { status } = this.state.project
    const func = (status != 'closed')?closeProject:openProject
    try {
      const result = await func(this.state.project, this.props.token)
      window.location.reload()
    }catch (err) {
      console.log('err')
      toast("Error occured:" + err.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }
  async applyProject() {
    try {
      const result = await applyProject(this.state.project, this.props.token)
      if(result) {
        toast("You applied this project", {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      }
    } catch(err) {
      toast("Error occured:" + err.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }
  async bookmarkProject() {

  }
  getActionButtons() {
    // if you are student, you can apply or bookmark...
    const { isPolitician } = this.props.user
    const { status } = this.state.project
    if(!isPolitician) {
      return (
        <div style={style.secondaryInfo}>
          <Button
            style={style.actionButton}
            block
            size="md"
            disabled={status != 'open'}
            onClick={this.applyProject.bind(this)}
            color="primary">
            <Icon name="plus" /> Apply
          </Button>
          <Button
            style={style.actionButton}
            block
            outline
            size="md"
            onClick={this.bookmarkProject.bind(this)}
            color="info">
            <Icon name="bookmark" /> Bookmark
          </Button>
        </div>
      )
    } else {
      // if you are politician and that you are owner,
      // you can modify or close the project
      return (
        <div style={style.secondaryInfo}>
          <Button
            style={style.actionButton}
            block
            outline
            size="md"
            onClick={this.editProject.bind(this)}
            color="info">
            Edit
          </Button>
          <Button
            block
            style={style.actionButton}
            onClick={this.closeProject.bind(this)}
            size="md" color="danger">
            {(status != "closed")?"Mark as closed":"Reopen the project"}
          </Button>
        </div>
      )
    }
  }
  statusAndDate(status, from, to) {
    return (
      <div style={style.secondaryInfo}>
        <h3><ProjectStatusBadge status={status} /></h3>
        <h3> | </h3>
        <h5>
          <b>
          <Icon name="calendar"/>
          {' '}
          {this.formatDate(from)}
          { (to && ` - ${this.formatDate(to)}`) || "Indefinite"}
          </b>
        </h5>
      </div>
    )
  }
  infoCard({_id, salary, nature, topic, tags, file}) {
    return (
      <Card body inverse color="secondary">
        <CardTitle>
          <Icon name="info"/> <b>About</b>
        </CardTitle>
        <CardText>
          <ListGroup flush>
            <ListGroupItem
              className="text-white bg-secondary justify-content-between"
            >
                <Icon name="money"/> Salary
                <h5 className="text-success">
                  <b>{salary}€</b>
                </h5>
            </ListGroupItem>
            <ListGroupItem
              className="text-white bg-secondary justify-content-between"
            >
              <Icon name="question"/> Type
              <h5>
                {_.startCase(nature)}
              </h5>
            </ListGroupItem>
            <ListGroupItem
              className="text-white bg-secondary justify-content-between"
            >
              <Icon name="tag" /> Tags
              <div style={style.secondaryInfo}>
              <h5>
                <b>
                  { tags?
                    (tags.map(t => (
                      <Badge style={style.tagBadge} color="info">{t}</Badge>
                    ))):(
                      <h5>None</h5>
                    )
                  }
                </b>
                </h5>
              </div>
            </ListGroupItem>
          </ListGroup>
        </CardText>
        {
          file && (
            <Button
              color="success"
              href={`${serverURL}/project/${_id}/file`}
            >
              <Icon name="download"/>{' '}
              Details
            </Button>
          )
        }
      </Card>
    )
  }
  descriptionCard(description) {
    return (
      <Card style={style.descriptionCard} body inverse color="secondary">
        <CardTitle>
          <Icon name="pencil"/> <b>Description</b>
        </CardTitle>
        <CardText>
          {description}
        </CardText>
      </Card>
    )
  }

  applicationList(applications) {
    return <ApplicationCard applications={applications} />
  }

  render() {
    // extract info
    const { project } = this.state
    if(!project) return null
    const {
      title,
      description,
      topic, nature,
      status,
      from, to,
      salary,
      tags,
      applications } = project
    // let tags = 'hahagagagahha'.split('').map(s => `tag-${s}`)
    return (
      <Container style={style.container}>
        <Row>
          <Col md="8">
            <Row>
              <Col>
                <h1><b>{title}</b></h1>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Status and Date */}
                {this.statusAndDate(status, from, to)}
              </Col>
            </Row>
            <Row>
              <Col>
                {this.getActionButtons()}
              </Col>
            </Row>
          </Col>
          <Col md="4">
            {this.infoCard(project)}
          </Col>
        </Row>
        <Row>
          <Col>
            {this.descriptionCard(description)}
          </Col>
        </Row>
        {
          this.state.isOwner && (
            <Row>
              <Col>
                {this.applicationList(applications)}
              </Col>
            </Row>
          )
        }
      </Container>
    )
  }
}

const style = {
  container: {
    marginTop: 16,
  },
  secondaryInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  actionButton: {
    margin: 8,
    width: '40%'
  },
  descriptionCard: {
    marginTop: 8
  },
  tagBadge: {
    margin: 4
  }
}
const mapStateToProps = state => ({
  ...state.auth
})

const mapDispatchToProps = dispatch => ({
  editProject: (project) => dispatch({
    type: ModalActions.MODIFY_PROJECT,
    content: project
  })
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectPage)
)
