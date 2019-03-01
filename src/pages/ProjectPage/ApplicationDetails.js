import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
  FormGroup,
  Input,
  Button,
  Col, Container, Row,
  Label,
  Card, CardBody
} from 'reactstrap'
import CreatorCard from './CreatorCard'
import {
  getName
} from '../../utils/user'
import {
  acceptApplication,
  rejectApplication
} from '../../backend/user'
import { avatarURL, cvURL } from '../../utils/requests'
import Icon from '../../components/icon'
// import Avatar from 'react-avatar'
import Avatar from '@material-ui/core/Avatar'
import { Field, Form } from 'formik'
import {
  ReactstrapInput
} from 'reactstrap-formik'
class ApplicationDetails extends React.Component {

  constructor(props) {
    super(props)
  }
  applicantCard(applicant) {
    const { history } = this.props
    const { CV, avatar, username } = applicant

    const displayName = getName(applicant)
    return (
      <div style={style.applicantCard}>
          <Avatar
            src={avatarURL(applicant)}
            alt={displayName}
            onClick={() => history.push(`/user/${username}`)}
          />
          <div style={{flex: 1, marginLeft: 8}}>
            {displayName}
          </div>
        {
          CV && (
            <Button
                href={cvURL(applicant)}
              >
              <Icon name="download" />
              {' '}
              CV
            </Button>
          )
        }
      </div>
    )
  }
  answerComponent({ question, answer }) {
    return (
      <div className="form-group">
        <label for={question}>{question}</label>
        <textarea
          className="form-control"
           value={answer} disabled>
        </textarea>
      </div>
    )
  }
  // use a different name so not to confuse with the backend functions
  accept() {
    const { token, application } = this.props
    acceptApplication(application._id, token)
      .then(result => window.location.reload())
  }
  reject() {
    const { token, application } = this.props
    rejectApplication(application._id, token)
      .then(result => window.location.reload())
  }
  render() {
    const {
      isOpen, onClose,
    } = this.props
    if(!isOpen) return null
    const {
      applicant, answers, status
    } = this.props.application
    const {
      CV,avatar
    } = applicant
    return (
      <Modal
        isOpen={true}
        toggle={onClose}>
        <ModalHeader toggle={onClose}>
          <div style={style.header}>
            <div style={{flex: 1, marginRight: 8}}>
              Application of {getName(applicant)}
            </div>

            {
              (status == 'pending') && (
                <div>
                  <Button
                    onClick={this.accept.bind(this)}
                    color="success">
                    <Icon name="check" />Accept
                  </Button>
                  {' '}
                  <Button
                    onClick={this.reject.bind(this)}
                    color="danger">
                    <Icon name="remove" />Reject
                  </Button>
                </div>
              )
            }
            {
              (status == 'accepted' && (
                <div>
                  <Button disabled color="success">
                    <Icon name="check" />Accepted
                  </Button>
                </div>
              ))
            }
            {
              (status == 'rejected' && (
                <div>
                  <Button disabled color="danger">
                    <Icon name="remove" />Rejected
                  </Button>
                </div>
              ))
            }
          </div>

        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col>
                {this.applicantCard(applicant)}
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Answers to questions</h4>
                <Form>
                {
                  Object.keys(answers).map(question => (
                    this.answerComponent({
                      question, answer: answers[question]
                    })
                  ))
                }
                </Form>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
})

export default withRouter(
  connect(mapStateToProps, null)(ApplicationDetails)
)

const style = {
  applicantCard: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}
