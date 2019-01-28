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
export default class ApplicationCard extends React.Component {
  noApplicationsNotice() {
    return <CenterNotice title="No applications found" />
  }
  applicationItem(application) {

  }
  applicationsList(applications) {
    return (
      <ListGroup flush>
        {
          applications.map(app => (
            <ListGroupItem
              className="text-white bg-info justify-content-between"
            >
              <UserChip user={app.applicant} />
              <Button color="primary">
                <Icon name="tick" /> Accept
              </Button>
              <Button color="secondary">
                <Icon name="cross"/> Reject
              </Button>
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
