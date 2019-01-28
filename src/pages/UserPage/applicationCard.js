import React from 'react'
import {
  Card, CardText, CardTitle,
  Badge
} from 'reactstrap'
import { withRouter } from 'react-router-dom'
import UserChip from '../../components/userChip'

const ApplicationCard = ({application, history}) => {
  const { project, status } = application
  const getBadge = (status) => {
    let color = 'primary'
    switch(status) {
      case "rejected":
        color = 'danger'
        break
      case "accepted":
        color = 'success'
        break
      default: break
    }
    return (
      <Badge color={color}>{status}</Badge>
    )
  }
  return (
    <Card body inverse color="info"
      style={style.container}
      onClick={() => history.push(`/project/${project._id}`)}>
      <CardTitle>
        {project.title}
      </CardTitle>
      <CardText>
        <div style={style.content}>
          <UserChip user={project.creator} />
          <div style={style.status}>
            {getBadge(status)}
          </div>
        </div>
      </CardText>
    </Card>
  )
}

const style = {
  container: {
    maxWidth: "40vw",
    width: "40vw",
    margin: 16
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}
export default withRouter(ApplicationCard)
