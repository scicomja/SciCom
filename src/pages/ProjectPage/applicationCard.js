import React from 'react'
import {
  Card, CardText, CardTitle,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button
} from 'reactstrap'
import Icon from '../../components/icon'
import UserChip from '../../components/userChip'
import CenterNotice from '../../components/centerNotice'
import { withRouter } from 'react-router-dom'
class ApplicationCard extends React.Component {
  noApplicationsNotice() {
    return <CenterNotice title="No applications found" />
  }
  applicationItem(application) {

  }
  toUserPage(user) {
    const { username } = user
    this.props.history.push(`/user/${username}`)
  }
  applicationsList(applications) {
    return (
      <ListGroup flush>
        {
          applications.map(app => (
            <ListGroupItem
              className="text-white bg-info"
              style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <div style={{flex: 1}}>
                <UserChip
                  onClick={() => this.toUserPage(app.applicant)}
                  avatarSize={32}
                  user={app.applicant} />
              </div>
              <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                <Button
                  onClick={() => this.acceptApplication(app)}
                  color="primary">
                  <Icon name="check" /> Accept
                </Button>
                {' '}
                <Button
                  onClick={() => this.rejectApplication(app)}
                  color="secondary">
                  <Icon name="times"/> Reject
                </Button>
              </div>

            </ListGroupItem>
          ))
        }
      </ListGroup>

    )
  }
  render() {
    const { applications } = this.props
    return (
      <Card body inverse color="info" style={style.container}>
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

export default withRouter(ApplicationCard)
