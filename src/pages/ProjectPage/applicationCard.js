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

class ApplicationCard extends React.Component {
  noApplicationsNotice() {
    return <CenterNotice title="No applications found" />
  }
  applicationItem(application) {
    const { applicant, status } = application
    const { showApplicationDetails } = this.props
    return (
      <ListGroupItem
        onClick={() => showApplicationDetails(application)}
        className="text-white bg-secondary"
        style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
      >
        <div style={{flex: 1}}>
          <UserChip
            avatarSize={32}
            user={applicant} />
        </div>
      </ListGroupItem>
    )
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
