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
  getApplications,
  closeProject,
  openProject,
  applyProject,
  deleteProject,
  completeProject,
  toggleBookmarkProject
} from '../../backend/user'
import { authorizedRequestGet } from '../../utils/requests'
import ProjectStatusBadge from '../../components/projectStatusBadge'
import Icon from '../../components/icon'
import * as ModalActions from '../../actions/modal'
import { REFRESH_USER_INFO } from '../../actions/auth'
import CreatorCard from './CreatorCard'
import ApplicationDetailsPopup from './ApplicationDetails'
import ApplyApplicationPopup from './ApplyApplicationPopup'
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
      isOwner: false,
      hasAppliedThis: false,
      applicationDetails: null,
      isAnsweringQuestion: false
    }
  }

  hasBookmarkedThis() {
    const { user } = this.props
    const { project } = this.state
    if(!project) return false
    return !!user.bookmarks.filter(bm => bm._id == project._id).length
  }
  async componentDidMount() {
    // find and populate the project info
    const { project_id } = this.props.match.params
    const { token, user } = this.props
    try {
      let project = await getProjectById(project_id, token)
      let applications = await getApplications(token)
      if(!project) {
        this.props.history.push('/')
        return
      }
      this.setState({
        project,
        isOwner: project.creator._id == user._id,
        hasAppliedThis: !!applications.filter(app => app.project._id == project._id).length
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
  async submitApplicationWithAnswers(answers) {
    const { project } = this.state
    try {
      applyProject({
        project,
        token: this.props.token,
        answers
      }).then( res => window.location.reload())
    } catch(err) {
      toast.error(err.message)
    }
  }
  async applyProject() {
    const { project, hasAppliedThis } = this.state
    try {
      // un-apply doesn't need to take care of whether there are questions or not
      if(hasAppliedThis) {
        applyProject({project, token: this.props.token})
          .then(_ => window.location.reload())
        return
      }
      // create a popup to make the student answer the questions
      // (in case there are any...)
      if (project.questions && project.questions.length) {
        this.openApplyApplicationPopup()
        return
      }
      // otherwise simply trigger the project application
      const result = await applyProject({project, token: this.props.token})
      if(result) {
        toast.success("You applied this project", {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      }
      window.location.reload()
    } catch(err) {
      toast.error("Error occured:" + err.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }
  async bookmarkProject() {
    try {
      const result = await toggleBookmarkProject(
          this.state.project,
          this.props.token)
      let message = "Bookmark removed"
      if(!result.length) {
        message = "Bookmark added"
      }
      // we bookmarked it!
      toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          // onClose: window.location.reload
      })
      this.props.refreshUserInfo()

    } catch(err) {
      toast("Error occured:" + err.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }

  }
  async deleteProject() {
    try {
      const result = await deleteProject(
        this.state.project,
        this.props.token)
      toast.success("Project deleted", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      window.location.reload()
    } catch(err) {
      toast("Error occured:" + err.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }
  getActionButtons() {
    // if you are student, you can apply or bookmark...
    const { isPolitician } = this.props.user
    const { status } = this.state.project
    const { hasAppliedThis, isOwner } = this.state
    if(!isPolitician) {
      return (
        <div style={style.secondaryInfo}>
          <Button
            style={style.actionButton}
            block
            size="md"
            disabled={status != 'open'}
            onClick={this.applyProject.bind(this)}
            color={hasAppliedThis?"danger":"primary"}>
            <Icon name={hasAppliedThis?"remove":"add"} />
            {hasAppliedThis?"Un-apply":"Apply"}
          </Button>
          <Button
            style={style.actionButton}
            block
            outline={!this.hasBookmarkedThis()}
            size="md"
            onClick={this.bookmarkProject.bind(this)}
            color="info">
            <Icon name="bookmark" /> {this.hasBookmarkedThis()?"Remove bookmark":"Add to Bookmark"}
          </Button>
        </div>
      )
    } else {
      // if you are politician and that you are owner,
      // you can modify or close the project
      const deleteButton = (
        <Button
          style={style.actionButton}
          block
          size="md" color="danger"
          onClick={this.deleteProject.bind(this)}>
          Delete
        </Button>
      )
      if(!isOwner || status == 'completed') {
        return (
          <div style={style.secondaryInfo}>
            {deleteButton}
          </div>
        )
      }

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
          {
            (status == "closed") && (
              <Button
                block
                style={style.actionButton}
                size="md" color="info"
                onClick={this.completeProject.bind(this)}>
                Mark as Completed
              </Button>
            )
          }
          {deleteButton}
        </div>
      )
    }
  }
  async completeProject() {
    const {_id: id} = this.state.project
    const { token } = this.props
    await completeProject(id, token)
    window.location.reload()
  }
  statusAndDate(status, from, to) {
    return (
      <div style={style.secondaryInfo}>
        <h5><ProjectStatusBadge status={status} /></h5>
        <h3>|</h3>
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
    const color = "primary"
    const listItemClassName = `text-white bg-${color} justify-content-between`
    return (
      <Card body inverse color={color}>
        <CardTitle>
          <Icon name="info"/> <b>About</b>
        </CardTitle>
        <CardText>
          <ListGroup flush>
            <ListGroupItem
              className={listItemClassName}
            >
                <Icon name="money"/> Salary
                <h5 className="text-success">
                  <b>{salary}€</b>
                </h5>
            </ListGroupItem>
            <ListGroupItem
              className={listItemClassName}
            >
              <Icon name="question"/> Type
              <h5>
                {_.startCase(nature)}
              </h5>
            </ListGroupItem>
            <ListGroupItem
              className={listItemClassName}
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
              href={`${serverURL}/project/${_id}/${file}`}
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
  showApplicationDetails(application) {
    this.setState({
      applicationDetails: application
    })
  }
  applicationList(applications) {
    return <ApplicationCard
      showApplicationDetails={this.showApplicationDetails.bind(this)}
      applications={applications} />
  }

  getCreatorCard() {
    const { isOwner, project } = this.state
    if(isOwner) return null // nothing to tell about oneself
    return (
      <CreatorCard creator={project.creator} />
    )
  }
  closeApplicationDetails() {
    this.setState({
      applicationDetails: null
    })
  }
  openApplyApplicationPopup() {
    this.setState({
      isAnsweringQuestion: true
    })
  }
  closeApplyApplicationPopup() {
    this.setState({
      isAnsweringQuestion: false
    })
  }
  render() {
    // extract info
    const {
      project,
      isAnsweringQuestion,
      applicationDetails } = this.state
    if(!project) {
      return null
    }
    const {
      title,
      description,
      topic, nature,
      status,
      from, to,
      salary,
      tags,
      applications } = project
    return (
      <Container style={style.container}>
        <ApplicationDetailsPopup
          application={applicationDetails}
          isOpen={!!applicationDetails}
          onClose={this.closeApplicationDetails.bind(this)}
        />
        <ApplyApplicationPopup
          project={project}
          isOpen={isAnsweringQuestion}
          onSubmit={this.submitApplicationWithAnswers.bind(this)}
          onClose={this.closeApplyApplicationPopup.bind(this)}
        />
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
            <Row>
              <Col>
                {this.getCreatorCard()}
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
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  actionButton: {
    margin: 8,
    // width: '40%',
    minWidth: '40%'
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
  }),
  refreshUserInfo: () => dispatch({
    type: REFRESH_USER_INFO
  })
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectPage)
)
