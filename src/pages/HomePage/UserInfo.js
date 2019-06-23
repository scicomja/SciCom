import React from "react"
import { Row, Col, Button } from "reactstrap"
import PropTypes from "prop-types"
import Avatar from "../../components/Avatar"
import Icon from "../../components/icon"
import { getName } from "../../utils/user"
import { cvURL } from "../../backend/user"

export default class UserInfo extends React.Component {
	static propTypes = {
		onCreateProject: PropTypes.func.isRequired,
		onEditInfo: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)

		const { isPolitician } = props.user

		this.fieldNameDict = {
			workingPhone: "Phone (Office)",
			position: "Political Position",
			duty: "Job Duty"
		}
	}
	infoDetailRow({ name, value }) {
		const arrayValue = "major".split(",")
		let displayValue = value || "--"
		if (arrayValue.indexOf(name) > -1) {
			// display the array
			displayValue = value.join(",") || "--"
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
					<Avatar size={96} user={user} />
					<Col style={style.nameColumn}>
						<Row>
							<div style={style.name}>{getName(user)}</div>
							<div style={style.title}>{user.title}</div>
						</Row>
						<Row>
							{isUserHimself && (
								<a style={style.editInfoLink} href="/editInfo">
									<Icon name="edit" />
									Profil bearbeiten
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
										Create Projects
									</Button>
								</Col>
							</Row>
							<Row style={style.createProjectButtonContainer}>
								<Col>
									<Button
										block
										color="primary"
										onClick={this.props.onCreateQuickQuestion}>
										Create quick questions
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
								value: <a href={cvURL(user)}> Download </a>
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
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between"
	},
	container: {
		padding: 16
	},
	name: {
		fontSize: 48
	},
	createProjectButtonContainer: {
		margin: 16
	},
	createProjectContainer: {
		flex: 1
	},
	editInfoLink: {},
	infoDetailContainer: {
		// minWidth: "50vw",
		// maxWidth: "100vw",
		display: "flex",
		minWidth: "50%",
		flexGrow: 1,
		padding: 16,
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
		fontSize: 20
	},
	infoDetail: {
		textOverflow: "ellipsis"
	}
}
