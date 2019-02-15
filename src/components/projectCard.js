import React from 'react'
import {
  Card,
  CardTitle,
  CardText,
  Badge
} from 'reactstrap'
import { connect } from 'react-redux'
import UserChip from './userChip'
import * as ModalActions from '../actions/modal'
import * as _ from 'lodash'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

const ProjectCard = function(props) {
  const {
    style: customStyle = {},
    project, isOwner,
    color: customColor
  } = props
  if(!project) return null
  const {
    title,
    creator,
    status,
    description,
    topic,
    salary,
    nature,
    from, to,
    _id: id,
  } = project
  if(!title || !creator) return null
  const getStatusChip = (status) => {
    let color = "info"
    switch(status) {
      case "open":
        color = "success"
        break
      case "closed":
        color = "danger"
        break
    }
    return (<Badge color={color}> {status} </Badge>)
  }
  const formatDate = date => moment(date).format("MMM Do YY")
  return (
    <Card body inverse color={customColor || "secondary"}
      onClick={() => props.history.push(`/project/${id}`)}
      style={{...style.container, ...customStyle}}>
      <CardTitle>
        <div style={style.spread}>
          <div>
            <b>{title}</b> {getStatusChip(status)}
          </div>
          <div>
            <h6>{formatDate(from)} { to && `- ${formatDate(to)}`} </h6>
          </div>
        </div>
      </CardTitle>
      {
        !isOwner && (
          <CardText>
            <UserChip user={creator} />
          </CardText>
        )
      }
      <CardText>
        {topic.map(t => (<Badge>{t}</Badge>))}
      </CardText>
      <CardText>
        <div>
          <div> {_.startCase(nature)} </div>
          <div className="text-success"><b>{salary}€</b></div>
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
  spread: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

const mapDispatchToProps = dispatch => ({
  showProject: p => dispatch({
    type: ModalActions.MODIFY_PROJECT,
    content: p
  })
})
export default withRouter(
  connect(null,mapDispatchToProps)(ProjectCard)
)
