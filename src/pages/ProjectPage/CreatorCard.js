import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  Card, CardTitle, CardText,
  Container, Row, Col
} from 'reactstrap'
import Avatar from 'react-avatar'
import { avatarURL } from '../../utils/requests'
import Icon from '../../components/icon'
class CreatorCard extends React.Component {
  render() {
    const {creator, history} = this.props
    const { title, username } = creator
    const getName = ({ firstName, lastName, username}) => {
      if(!firstName && !lastName) return username
      return `${firstName} ${lastName}`
    }
    const displayName = getName(creator)
    return (
      <Card
        inverse
        color="secondary"
        onClick={() => history.push(`/user/${username}`)}
        body>
        <CardTitle>
          <Icon name="user"/> Creator
        </CardTitle>
        <CardText>
          <Container>
            <Row>
              <Col md="2">
                <Avatar
                  round
                  size={32}
                  src={avatarURL({username})}
                  name={displayName}
                />
              </Col>
              <Col md="10">
                <Row>
                  <Col>
                  <b>{displayName}</b>
                  </Col>
                </Row>
                {
                  title && (
                    <Row>
                      <Col>
                        {title}
                      </Col>
                    </Row>
                  )
                }
              </Col>
            </Row>
          </Container>
        </CardText>

      </Card>
    )
  }

}

export default withRouter(CreatorCard)
