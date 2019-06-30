import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormFeedback,
	FormGroup,
	Input,
	Button,
	Col,
	Container,
	Row,
	Label,
	Card,
	CardBody
} from "reactstrap"
import CreatorCard from "./CreatorCard"
import { toast } from "react-toastify"
import { delay } from "../../utils"
import { getName } from "../../utils/user"
import { acceptApplication, rejectApplication } from "../../backend/user"
import { avatarURL, cvURL } from "../../utils/requests"
import Icon from "../../components/icon"
import Avatar from "../../components/Avatar"
import { Field, Form } from "formik"
import { ReactstrapInput } from "reactstrap-formik"
import Locale from "../../locale"

class ApplicationDetails extends React.Component {
	constructor(props) {
		super(props)
	}
	applicantCard(applicant) {
		const { history } = this.props
		const { CV, avatar, username } = applicant

		const displayName = getName(applicant)
		return (
			<a href={`/user/${username}`}>
				<div style={style.applicantCard}>
					{Locale.applicationDetailsPopup.applicant}
					<div style={style.applicantCardInner}>
						<Avatar user={applicant} />

						<div style={{ flex: 1, marginLeft: 8 }}>{displayName}</div>
						{CV && (
							<Button href={cvURL(applicant)}>
								<Icon name="download" /> {Locale.userAttributes.CV}
							</Button>
						)}
					</div>
				</div>
			</a>
		)
	}
	answerComponent({ question, answer }) {
		return (
			<div className="form-group">
				<label for={question}>{question}</label>
				<textarea className="form-control" value={answer} disabled />
			</div>
		)
	}
	// use a different name so not to confuse with the backend functions
	accept() {
		const { token, application } = this.props
		acceptApplication(application._id, token).then(() =>
			this.notifyAcceptRejectResult(true)
		)
	}
	reject() {
		const { token, application } = this.props
		rejectApplication(application._id, token).then(() =>
			this.notifyAcceptRejectResult(false)
		)
	}
	notifyAcceptRejectResult(accept = true) {
		const time = 2000
		toast(`The application has been ${accept ? "accepted" : "rejected"}.`, {
			autoClose: time
		})
		setTimeout(() => window.location.reload(), time)
	}

	render() {
		const { isOpen, onClose } = this.props
		if (!isOpen) return null
		const { applicant, answers, status } = this.props.application
		const { CV, avatar } = applicant
		return (
			<Modal isOpen={true} toggle={onClose}>
				<ModalHeader toggle={onClose}>
					<div style={style.header}>
						<div style={{ flex: 1, marginRight: 8 }}>
							{Locale.applicationDetailsPopup.title(getName(applicant))}
						</div>

						{status == "pending" && (
							<div>
								<Button onClick={this.accept.bind(this)} color="success">
									<Icon name="check" />
									{Locale.applicationDetailsPopup.accept}
								</Button>{" "}
								<Button onClick={this.reject.bind(this)} color="danger">
									<Icon name="remove" />
									{Locale.applicationDetailsPopup.reject}
								</Button>
							</div>
						)}
						{status == "accepted" && (
							<div>
								<Button disabled color="success">
									<Icon name="check" />
									{Locale.applicationDetailsPopup.accepted}
								</Button>
							</div>
						)}
						{status == "rejected" && (
							<div>
								<Button disabled color="danger">
									<Icon name="remove" />
									{Locale.applicationDetailsPopup.rejected}
								</Button>
							</div>
						)}
					</div>
				</ModalHeader>
				<ModalBody>
					<Container>
						<Row>
							<Col>{this.applicantCard(applicant)}</Col>
						</Row>
						{Object.keys(answers).length > 0 && (
							<Row>
								<Col>
									<h4>{Locale.applicationDetailsPopup.answersToQuestion}</h4>
									<Form>
										{Object.keys(answers).map(question =>
											this.answerComponent({
												question,
												answer: answers[question]
											})
										)}
									</Form>
								</Col>
							</Row>
						)}
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
	connect(
		mapStateToProps,
		null
	)(ApplicationDetails)
)

const style = {
	applicantCard: {
		display: "flex",
		flexDirection: "column",
		padding: 16,
		margin: 16,
		// justifyContent: 'flex-end',
		// alignItems: 'center',
		backgroundColor: "rgb(128,128,128)",
		color: "white"
	},
	applicantCardInner: {
		display: "flex",
		flexDirection: "row",
		margin: 8
	},
	header: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center"
	}
}
