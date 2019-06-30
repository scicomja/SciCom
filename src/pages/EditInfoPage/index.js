import React from "react"

import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import * as _ from "lodash"
import * as Yup from "yup"

import Icon from "../../components/icon"
import * as AuthActions from "../../actions/auth"
import {
	Container,
	Row,
	Col,
	Button,
	FormGroup,
	Label,
	Input,
	Alert
} from "reactstrap"
import Locale from "../../locale"
import { Formik, Form, Field, ErrorMessage } from "formik"
import ChangePasswordPopup from "./changePasswordPopup"
import ChipsInput, { Chip } from "react-chips"
import { ReactstrapInput, ReactstrapSelect } from "reactstrap-formik"
import { fileToBase64 } from "../../utils/Form"
import { avatarURL } from "../../utils/requests"
import { germanStates } from "../../constants"
import { updateUserInfo } from "../../backend/user"
import DeletePopup from "./deletePopup"
// import Avatar from 'react-avatar'
import Avatar from "../../components/Avatar"
import { toast } from "react-toastify"

class EditInfoPage extends React.Component {
	constructor(props) {
		super(props)
		// fetch and populate form
		this.state = {
			initialValues: {},
			// store the base64 of the uploaded (but not saved) avatar here
			temporaryAvatar: null,
			errorMessage: null,
			showDeletePopup: false,
			showChangePasswordPopup: false
		}
		const phoneRegex = /^((\+49)|(00))?\ ?[\d]{3,4}\ ?[\d]{6,8}$/
		this.rawSchema = {
			firstName: Yup.string().required(),
			lastName: Yup.string().required(),
			phone: Yup.string()
				.matches(phoneRegex, Locale.editInfoPage.phoneNumberFormatError)
				.required(),
			workingPhone: Yup.string().matches(
				phoneRegex,
				Locale.editInfoPage.phoneNumberFormatError
			),
			party: Yup.string(),
			duty: Yup.string(),

			website: Yup.string(),
			CV: Yup.mixed(),
			avatar: Yup.mixed(),
			linkedIn: Yup.string(),

			city: Yup.string().required(),
			state: Yup.string()
				.oneOf(germanStates)
				.required(),
			PLZ: Yup.string()
				.matches(/^\d{5}$/, Locale.editInfoPage.plzError)
				.required(),

			title: Yup.string(),
			major: Yup.array().of(Yup.string()),
			university: Yup.string(),
			position: Yup.string().min(5, Locale.editInfoPage.positionError)
		}
		this.validationSchema = Yup.object().shape(this.rawSchema)
	}
	componentDidMount() {
		this.setState({
			initialValues: _.pick(this.props.user, Object.keys(this.rawSchema))
		})
	}
	async updateInfo(values) {
		try {
			const result = await updateUserInfo(values, this.props.token)
			if (result.error) {
				this.setState({
					errorMessage: result.error
				})
				return
			}
			// update the sotre
			this.props.updateInfo(result)
			this.props.history.push("/")
		} catch (err) {
			toast.error(Locale.editInfoPage.updateFailError)
		}
	}
	onEditPassword() {
		this.setState({
			showChangePasswordPopup: true
		})
	}
	onCancelEditPassword() {
		this.setState({
			showChangePasswordPopup: false
		})
	}
	textInput(name, required = false) {
		const fieldName = Locale.userAttributes[name] + (required ? "(*)" : "")
		return (
			<Col>
				<Field
					name={name}
					label={fieldName}
					type="text"
					component={ReactstrapInput}
				/>
			</Col>
		)
	}
	render() {
		// bounce back to login page if such user doesn't exist
		if (!this.props.user) {
			window.location.reload("/")
		}
		const {
			initialValues,
			temporaryAvatar,
			showChangePasswordPopup,
			showDeletePopup,

			errorMessage
		} = this.state
		if (!initialValues) return null
		const { isPolitician, email, username, avatar } = this.props.user

		return (
			<div style={style.container}>
				<DeletePopup
					visible={showDeletePopup}
					onClose={this.hideAccountDeletePopup.bind(this)}
				/>
				<ChangePasswordPopup
					visible={showChangePasswordPopup}
					onClose={this.onCancelEditPassword.bind(this)}
				/>
				{errorMessage && (
					<Alert color="danger">
						Cannot update profile. Please check the format of your CV
					</Alert>
				)}
				<Container>
					<Row>
						<Col>
							<h1 style={style.header}>
								<Icon name="edit" /> {Locale.editInfoPage.title}
							</h1>
						</Col>
					</Row>
					{this.props.location.search.indexOf("block") > -1 && (
						<Alert color="danger">{Locale.editInfoPage.blockMessage}</Alert>
					)}
					<Row style={style.basicContainer}>
						<Col
							md={2}
							style={{ ...style.nameComponent, ...style.avatarComponent }}>
							<Avatar
								size={72}
								user={this.props.user}
								onClick={() => document.getElementById("avatar").click()}
								src={temporaryAvatar}
							/>
							<p style={{ textAlign: "center" }}>
								{Locale.editInfoPage.clickToEdit}
							</p>
						</Col>
						<Col style={style.nameComponent}>
							<Row>
								<Col>{username}</Col>
							</Row>
							<Row>
								<Col>{email}</Col>
							</Row>
						</Col>
						<Col style={style.editPasswordColumn}>
							<Row>
								<Col>
									<Button
										block
										style={style.changePasswordButton}
										onClick={this.onEditPassword.bind(this)}>
										{Locale.editInfoPage.changePasswordButton}
									</Button>
								</Col>
							</Row>

							<Row>
								<Col>
									<Button
										block
										color="danger"
										onClick={this.showAccountDeletePopup.bind(this)}>
										<Icon name="trash" />{" "}
										{Locale.editInfoPage.deleteAccountButton}
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Formik
							enableReinitialize
							initialValues={initialValues}
							validationSchema={this.validationSchema}>
							{({
								values,
								errors,
								dirty,
								isValid,
								isSubmitting,
								setFieldValue,
								handleChange
							}) => (
								<Form>
									<input
										id="avatar"
										name="avatar"
										type="file"
										style={{ visibility: "hidden" }}
										onChange={e => {
											const file = e.currentTarget.files[0]
											setFieldValue("avatar", file)
											fileToBase64(file).then(f => {
												this.setState({
													temporaryAvatar: f
												})
											})
										}}
									/>
									<FormGroup row>
										{this.textInput("firstName", true)}
										{this.textInput("lastName", true)}
									</FormGroup>
									<FormGroup row>
										{this.textInput("phone", true)}
										{isPolitician && this.textInput("workingPhone")}

										{this.textInput("website")}
										{this.textInput("linkedIn")}
									</FormGroup>
									<FormGroup row>
										<Col>
											<Field
												label={Locale.userAttributes.state + "(*)"}
												name="state"
												component={ReactstrapSelect}
												inputprops={{
													label: Locale.userAttributes.state + "(*)",
													options: germanStates
												}}
											/>
										</Col>
										{this.textInput("city", true)}
										{this.textInput("PLZ", true)}
									</FormGroup>
									<FormGroup row>
										<Col>
											<div className="form-group">
												<label for="CV">{Locale.userAttributes.CV}</label>
												<input
													type="file"
													name="CV"
													onChange={e =>
														setFieldValue("CV", e.currentTarget.files[0])
													}
												/>
											</div>
										</Col>
										{this.textInput("title")}
									</FormGroup>
									{!isPolitician ? (
										<FormGroup row>
											<Col>
												<Label for="major">Major</Label>
												<Field
													label={Locale.userAttributes.major}
													name="major"
													component={ChipsInput}
													createChipKeys={[" ", "Enter"]}
													value={values["major"]}
													onChange={v => setFieldValue("major", v)}
												/>
											</Col>
											{this.textInput("university")}
											{this.textInput("semester")}
										</FormGroup>
									) : (
										<FormGroup row>
											{this.textInput("party")}
											{this.textInput("position")}
											{this.textInput("duty")}
										</FormGroup>
									)}
									<Button
										block
										disabled={!isValid || !dirty}
										onClick={() => this.updateInfo(values)}
										color="primary">
										{Locale.editInfoPage.saveButton}
									</Button>
								</Form>
							)}
						</Formik>
					</Row>
				</Container>
			</div>
		)
	}
	showAccountDeletePopup() {
		this.setState({
			showDeletePopup: true
		})
	}

	hideAccountDeletePopup() {
		this.setState({
			showDeletePopup: false
		})
	}
}

const style = {
	changePasswordButton: {
		marginBottom: 8
	},
	container: {
		margin: 16
	},
	header: {},
	basicContainer: {
		margin: 16
	},
	nameComponent: {
		// display: 'flex',
		// textAlign: 'center'
	},
	avatarComponent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	}
}
const mapStateToProps = state => ({
	...state.auth
})

const mapDispatchToProps = dispatch => ({
	updateInfo: info =>
		dispatch({
			type: AuthActions.UPDATE_USER_INFO,
			info
		})
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(EditInfoPage)
)
