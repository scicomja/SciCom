import React from 'react'
import {
  Card,
  CardTitle,
  CardText,
  Badge
} from 'reactstrap'
import UserChip from './userChip'
export default function({project, isOwner}) {
  if(!project) return null
  const {
    title,
    creator,
    status,
    description,
    topic,
    salary,
    nature
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
  return (
    <Card body inverse color="secondary"
      style={style.container}>
      <CardTitle>
        <b>{title}</b> {getStatusChip(status)}
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
        {nature} | <b>{salary} </b>
      </CardText>
    </Card>
  )
}

const style = {
  container: {
    maxWidth: 256,
    margin: 16
  },

}
