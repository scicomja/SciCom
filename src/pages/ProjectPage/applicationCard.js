import React from 'react'
import {
  Card, CardText, CardTitle,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button
} from 'reactstrap'
import { connect } from 'react-redux'
import Icon from '../../components/icon'
import UserChip from '../../components/userChip'
import CenterNotice from '../../components/centerNotice'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  acceptApplication,
  rejectApplication
} from '../../backend/user'
class ApplicationCard extends React.Component {
  noApplicationsNotice() {
    return <CenterNotice title="No applications found" />
  }
  async acceptApplication(app) {
    const {token } = this.props
    const { _id: applicationId} = app
    let result = await acceptApplication(applicationId, token)
    if(result.status == 'accepted') {
      toast("Application accepted")
    }
  }
  async rejectApplication(app) {
    const {token } = this.props
    const { _id: applicationId} = app
    let result = await rejectApplication(applicationId, token)
    if(result.status == 'rejected') {
      toast("Application rejected")
    }

  }
  applicationItem(application) {
    const { applicant, status } = application
    return (
      <ListGroupItem
        className="text-white bg-secondary"
        style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
      >
        <div style={{flex: 1}}>
          <UserChip
            onClick={() => this.toUserPage(applicant)}
            avatarSize={32}
            user={applicant} />
        </div>
        {
          (status == 'pending') &&
            this.getApplicationPendingButtons(application)
        }
        {
          (status == 'accepted') &&
            this.getApplicationAcceptedButtons(application)
        }
        {

          (status == 'rejected') &&
            this.getApplicationRejectedButtons(application)
        }


      </ListGroupItem>
    )
  }
  getApplicationRejectedButtons(application) {
    return (
      <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          disabled
          color="secondary">
          <Icon name="times" /> Rejected
        </Button>
      </div>
    )
  }
  getApplicationAcceptedButtons(application) {
    return (
      <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          disabled
          color="primary">
          <Icon name="check" /> Accepted
        </Button>
      </div>
    )
  }
  getApplicationPendingButtons(application) {
    return (
      <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          onClick={() => this.acceptApplication(application)}
          color="primary">
          <Icon name="check" /> Accept
        </Button>
        {' '}
        <Button
          onClick={() => this.rejectApplication(application)}
          color="secondary">
          <Icon name="times"/> Reject
        </Button>
      </div>
    )
  }
  toUserPage(user) {
    const { username } = user
    this.props.history.push(`/user/${username}`)
  }
  applicationsList(applications) {
    return (
      <ListGroup flush>
        {
          applications.map(this.applicationItem.bind(this))
        }
      </ListGroup>

    )
  }
  render() {
    const { applications } = this.props
    return (
      <Card body inverse color="secondary" style={style.container}>
        <CardTitle>
          <Icon name="question"/>{' '}
          Applications
        </CardTitle>
        <CardText>
          {
            (!applications || !applications.length)?
            (this.noApplicationsNotice()):
            (this.applicationsList(applications))
          }
        </CardText>
      </Card>
    )
  }
}

const style = {
  container: {
    marginTop: 16
  }
}
const mapStateToProps = state => ({
  token: state.auth.token
})

export default withRouter(
  connect(mapStateToProps, null)(ApplicationCard)
)
