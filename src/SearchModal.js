import React from "react"
import { connect } from "react-redux"
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormGroup,
	Col,
	Button,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Label,
	Input,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap"
import DatePicker from "react-datepicker"
import {
	ModalMode,
	germanStates,
	projectStatus,
	projectTypeDict
} from "./constants"

import { ReactstrapInput, ReactstrapSelect } from "reactstrap-formik"

import { Formik, Form, Field, ErrorMessage } from "formik"
import classnames from "classnames"
import { withRouter } from "react-router-dom"
import {
	initialValues,
	validationSchema,
	salaryOptions
} from "./backend/search"
import Icon from "./components/icon"
import * as Yup from "yup"
import * as SearchActions from "./actions/search"
import moment from "moment"
import * as _ from "lodash"
import Locale from "./locale"

class SearchModal extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isProjectNatureDropdownOpen: false,
			isSalaryDropdownOpen: false
		}
		this.toggleProjectNatureDropDown = () =>
			this.setState({
				isProjectNatureDropdownOpen: !this.state.isProjectNatureDropdownOpen
			})
		this.toggleSalaryDropDown = () =>
			this.setState({ isSalaryDropdownOpen: !this.state.isSalaryDropdownOpen })
	}
	search(values) {
		// TODO: submit search here...
		const { search, history } = this.props
		search(values)
		// DO NOT push to search page here: wait till the params are set
	}

	onSubmitForm(form, actions) {
		this.props.search(form)
		// alert(JSON.stringify(form))
		this.props.history.push("/search")
	}

	render() {
		const { form, close, isModalOpen } = this.props
		return (
			<Modal isOpen={isModalOpen} toggle={close}>
				<ModalHeader toggle={close}>
					<Icon name="search" /> {Locale.searchPrompt.search}
				</ModalHeader>
				<ModalBody>
					<Formik
						enableReinitialize
						initialValues={form}
						validationSchema={validationSchema}
						onSubmit={this.onSubmitForm.bind(this)}>
						{({ values, errors, dirty, setFieldValue, submitForm }) => (
							<Form style={style.formContainer}>
								<FormGroup>
									<Label for="searchTerm">
										{Locale.searchPrompt.searchTerm}
									</Label>
									<Input
										placeholder={Locale.searchPrompt.searchTermPlaceholder}
										tag={Field}
										name="searchTerm"
										type="text"
									/>
								</FormGroup>

								<FormGroup>
									<Label for="type">{Locale.searchPrompt.nature}</Label>

									<Dropdown
										isOpen={this.state.isProjectNatureDropdownOpen}
										toggle={this.toggleProjectNatureDropDown}>
										<DropdownToggle caret>
											{values.type
												? projectTypeDict[values.type]
												: Locale.searchPrompt.chooseAnOption}
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem onClick={() => setFieldValue("type", null)}>
												{Locale.searchPrompt.chooseAnOption}
											</DropdownItem>
											{Object.keys(projectTypeDict).map(value => (
												<DropdownItem
													onClick={() => setFieldValue("type", value)}>
													{projectTypeDict[value]}
												</DropdownItem>
											))}
										</DropdownMenu>
									</Dropdown>
								</FormGroup>

								<FormGroup>
									<Label for="salary">{Locale.searchPrompt.salary}</Label>

									<Dropdown
										isOpen={this.state.isSalaryDropdownOpen}
										toggle={this.toggleSalaryDropDown}>
										<DropdownToggle caret>
											{values.salary
												? salaryOptions[values.salary]
												: Locale.searchPrompt.chooseAnOption}
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem
												onClick={() => setFieldValue("salary", null)}>
												-- Choose an option --
											</DropdownItem>
											{Object.keys(salaryOptions).map(value => (
												<DropdownItem
													onClick={() => setFieldValue("salary", value)}>
													{salaryOptions[value]}
												</DropdownItem>
											))}
										</DropdownMenu>
									</Dropdown>
								</FormGroup>
								<FormGroup>
									<Label for="date">{Locale.searchPrompt.date}</Label>
									<br />
									<DatePicker
										name="date"
										placeholder="Date after"
										autoComplete="off"
										selected={values.date}
										onChange={e => {
											const date = moment(e)
												.startOf("day")
												.toISOString()
											setFieldValue("date", date)
										}}
									/>
								</FormGroup>
								<Button disabled={!dirty || !_.isEmpty(errors)} type="submit">
									{Locale.searchPrompt.search}
								</Button>
							</Form>
						)}
					</Formik>
				</ModalBody>
			</Modal>
		)
	}
}

const style = {}

const mapStateToProps = state => ({
	...state.search, //form, isModalOpen
	user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
	close: () =>
		dispatch({
			type: SearchActions.CLOSE_SEARCH_MODAL
		}),
	search: form =>
		dispatch({
			type: SearchActions.SET_SEARCH_PARAMS,
			form
		})
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SearchModal)
)
