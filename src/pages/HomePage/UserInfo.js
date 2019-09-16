import React from "react"
import { Row, Col, Button } from "reactstrap"
import PropTypes from "prop-types"
import Avatar from "../../components/Avatar"
import Icon from "../../components/icon"
import { getName } from "../../utils/user"
import { cvURL } from "../../backend/user"
import Locale from "../../locale"

export default class UserInfo extends React.Component {
	static propTypes = {
		onCreateProject: PropTypes.func.isRequired,
		onEditInfo: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)

		const { isPolitician } = props.user

		// this.fieldNameDict = {
		// 	workingPhone: "Phone (Office)",
		// 	position: "Political Position",
		// 	duty: "Job Duty"
		// }
		this.fieldNameDict = Locale.userAttributes
	}
	infoDetailRow({ name, value }) {
		const arrayValue = "major".split(",") // fields that contain URL
		const linkValue = "website,linkedIn".split(",") // fields that contain URL
		let displayValue = value || "--"
		if (arrayValue.indexOf(name) > -1) {
			// display the array
			displayValue = value.join(",") || "--"
		}
		if (name == "website" && value) {
			const link = value.indexOf("http") == 0 ? value : `http://${value}`
			displayValue = <a href={link}>{value}</a>
		}
		if (name == "linkedIn" && value) {
			const link =
				value.indexOf("http") == 0
					? value
					: `https://www.linkedin.com/in/${value}`
			displayValue = <a href={link}>{value}</a>
		}
		return (
			<div style={style.infoDetailContainer}>
				<div style={style.infoName}>{this.fieldNameDict[name] || name}:</div>
				<div style={style.infoDetail}>{displayValue}</div>
			</div>
		)
	}
	getUserInfoFieldNames() {
		let fields = "email,phone,state,city,PLZ,website,linkedIn"
		if (this.props.user.isPolitician) {
			fields += ",workingPhone,party,position,duty"
		} else {
			fields += ",university,major,semester"
		}
		return fields.split(",")
	}
	render() {
		const { user, isUserHimself } = this.props
		// alert(JSON.stringify(user))
		return (
			<div className="UserInfo" style={style.container}>
				<Row>
					<div style={style.avatarContainer}>
						<Avatar size={96} user={user} />
					</div>
					<Col style={style.nameColumn}>
						<Row>
							<div style={style.name}>{getName(user)}</div>
							<div style={style.title}>{user.title}</div>
						</Row>
						<Row>
							{isUserHimself && (
								<a href="/editInfo">
									<Icon name="edit" />
									{Locale.homePage.editProfile}
								</a>
							)}
						</Row>
					</Col>
					{user.isPolitician && isUserHimself && (
						<Col style={style.createProjectContainer}>
							<Row style={style.createProjectButtonContainer}>
								<Col>
									<Button
										block
										color="primary"
										onClick={this.props.onCreateProject}>
										{Locale.homePage.createProjectButton}
									</Button>
								</Col>
							</Row>
							<Row style={style.createProjectButtonContainer}>
								<Col>
									<Button
										block
										color="primary"
										onClick={this.props.onCreateQuickQuestion}>
										{Locale.homePage.createQuickQuestionButton}
									</Button>
								</Col>
							</Row>
						</Col>
					)}
				</Row>
				<Row>
					<div style={style.infoDetailMainContainer}>
						{this.getUserInfoFieldNames().map(info =>
							this.infoDetailRow({
								name: info,
								value: user[info]
							})
						)}
						{user.CV &&
							this.infoDetailRow({
								name: "CV",
								value: <a href={cvURL(user)}> {Locale.homePage.download} </a>
							})}
					</div>
				</Row>
			</div>
		)
	}
}

const style = {
	infoDetailMainContainer: {
		display: "flex",
		flexWrap: "wrap",
		width: "100%",
		paddingTop: 64,
		paddingBottom: 32
	},
	nameColumn: {
		paddingLeft: 32,
		minWidth: 256,
		flex: 8,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between"
	},
	container: {
		padding: 16
	},
	name: {
		fontSize: 48,
		display: "flex"
	},
	createProjectButtonContainer: {
		margin: 16
	},
	createProjectContainer: {
		flex: 8
	},
	avatarContainer: {
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	infoDetailContainer: {
		display: "flex",
		minWidth: "50%",
		flexGrow: 1,
		padding: 16,
		paddingRight: 24,
		fontSize: "calc(14px + 0.8vw)",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	infoName: {
		fontWeight: "bold",
		textTransform: "capitalize"
	},
	title: {
		display: "flex",
		marginLeft: 16,
		justifyContent: "center",
		alignItems: "flex-end",
		paddingBottom: 10,
		fontSize: 20
	},
	infoDetail: {
		textOverflow: "ellipsis"
	}
}
