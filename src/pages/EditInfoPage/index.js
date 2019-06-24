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
				.matches(phoneRegex, "Phone number has invalid format")
				.required(),
			workingPhone: Yup.string().matches(
				phoneRegex,
				"Phone number has invalid format"
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
				.matches(/^\d{5}$/, "PLZ should be 5 digits")
				.required(),

			title: Yup.string(),
			major: Yup.array().of(Yup.string()),
			university: Yup.string(),
			position: Yup.string().min(5, "position too short")
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
			toast.error(err.message)
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
	textInput(label, name) {
		return (
			<Col>
				<Field
					name={name}
					label={label}
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
								<Icon name="edit" /> Modify your info
							</h1>
						</Col>
					</Row>
					{this.props.location.search.indexOf("block") > -1 && (
						<Alert color="danger">
							{" "}
							You must fill in your personal information before using
							Sci-com.org{" "}
						</Alert>
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
							<p>Click to edit</p>
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
										Change Password
									</Button>
								</Col>
							</Row>

							<Row>
								<Col>
									<Button
										block
										color="danger"
										onClick={this.showAccountDeletePopup.bind(this)}>
										<Icon name="trash" /> Delete Account
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
										{this.textInput("First Name(*)", "firstName")}
										{this.textInput("Last Name(*)", "lastName")}
									</FormGroup>
									<FormGroup row>
										{this.textInput("Phone(*)", "phone")}
										{isPolitician &&
											this.textInput("Working Phone", "workingPhone")}

										{this.textInput("Website", "website")}
										{this.textInput("LinkedIn", "linkedIn")}
									</FormGroup>
									<FormGroup row>
										<Col>
											<Field
												label="State(*)"
												name="state"
												component={ReactstrapSelect}
												inputprops={{
													label: "State(*)",
													options: germanStates
												}}
											/>
										</Col>
										{this.textInput("City(*)", "city")}
										{this.textInput("PLZ(*)", "PLZ")}
									</FormGroup>
									<FormGroup row>
										<Col>
											<div className="form-group">
												<label for="CV">CV</label>
												<input
													type="file"
													name="CV"
													onChange={e =>
														setFieldValue("CV", e.currentTarget.files[0])
													}
												/>
											</div>
										</Col>
										{this.textInput("Title", "title")}
									</FormGroup>
									{!isPolitician ? (
										<FormGroup row>
											<Col>
												<Label for="major">Major</Label>
												<Field
													label="Major"
													name="major"
													component={ChipsInput}
													createChipKeys={[" ", "Enter"]}
													value={values["major"]}
													onChange={v => setFieldValue("major", v)}
												/>
											</Col>
											{this.textInput("University", "university")}
											{this.textInput("Semester", "semester")}
										</FormGroup>
									) : (
										<FormGroup row>
											{this.textInput("Party", "party")}
											{this.textInput("Political Position", "position")}
											{this.textInput("Job Duty", "duty")}
										</FormGroup>
									)}
									<Button
										block
										disabled={!isValid || !dirty}
										onClick={() => this.updateInfo(values)}
										color="primary">
										Update
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
