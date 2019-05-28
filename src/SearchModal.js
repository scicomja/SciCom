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
	Input
} from "reactstrap"
import DatePicker from "react-datepicker"
import {
	ModalMode,
	SearchMode,
	SearchValidationSchema,
	SearchInitialValue,
	germanStates,
	projectStatus,
	projectType
} from "./constants"

import { ReactstrapInput, ReactstrapSelect } from "reactstrap-formik"

import { Formik, Form, Field, ErrorMessage } from "formik"
import classnames from "classnames"
import { withRouter } from "react-router-dom"
import { initialValues, validationSchema } from "./backend/search"
import Icon from "./components/icon"
import * as Yup from "yup"
import * as SearchActions from "./actions/search"
import moment from "moment"
import * as _ from "lodash"

class SearchModal extends React.Component {
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
					<Icon name="search" /> Search
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
									<Label for="searchTerm">Search Words</Label>
									<Input
										placeholder="search words (username, project title, etc...)"
										tag={Field}
										name="searchTerm"
										type="text"
									/>
								</FormGroup>
								<FormGroup>
									<Label for="salary">Salary</Label>
									<Input
										placeholder="Salary from the project"
										tag={Field}
										name="salary"
										type="text"
									/>
								</FormGroup>
								<FormGroup>
									<Label for="date">Project Date </Label>
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
									Search
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
