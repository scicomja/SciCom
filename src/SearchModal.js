import React from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup, Col,
  Button,
  TabContent, TabPane,
  Nav, NavItem, NavLink,
  Label
} from 'reactstrap'
import DatePicker from 'react-datepicker'
import {
  ModalMode,
  SearchMode,
  SearchValidationSchema,
  SearchInitialValue,
  germanStates,
  projectStatus,
  projectType,
} from './constants'

import {
  ReactstrapInput,
  ReactstrapSelect,
} from 'reactstrap-formik'

import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import Icon from './components/icon'
import * as Yup from 'yup'
import * as SearchActions from './actions/search'
import moment from 'moment'

class SearchModal extends React.Component {
  search(values) {
    // TODO: submit search here...
    console.log('submitting payload', values)
    const { close, search, history } = this.props
    close()
    search(values)
    history.push('/search')

    // determine the endpoints depending on searchMode
  }
  getForm(params) {
    const { searchMode, searchParams } = this.props
    const { values, dirty, isValid, setFieldValue, resetForm } = params
    const buttonGroup = (
      <FormGroup row>
        <Col md="6" className="justify-space-between">
          <Button
            disabled={ !isValid || !dirty}
            onClick={() => this.search(values)}
            color="info">
            Search
          </Button>
          {' '}
          <Button
            onClick={() => resetForm(SearchInitialValue[searchMode])}
            disabled={!dirty}>
            Clear
          </Button>
        </Col>
      </FormGroup>
    )
    switch(searchMode) {
      case SearchMode.PROJECT:
        return (
          <Form>
            <Field name="title" label="Title" type="text"
              component={ReactstrapInput}
            />
            <Field name="salary" label="Salary (More than)" type="number"
              component={ReactstrapInput}
            />
            <FormGroup row>
              <Col md="6">
                <Field
                  name="status" label="Status" type="text"
                  component={ReactstrapSelect}
                  inputprops={{
                    label: "Status",
                    options: projectStatus
                  }}
                />
              </Col>
              <Col md="6">
                <Field
                  name="nature" label="Type" type="text"
                  component={ReactstrapSelect}
                  inputprops={{
                    label: "Type",
                    options: projectType
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label for="from"> From </Label>
                  <DatePicker
                    name="from"
                    autoComplete="off"
                    selected={values.from}
                    onChange={e => {
                      const date = moment(e).startOf('day').toISOString()
                      setFieldValue('from',date)
                    }}
                  />
                <ErrorMessage name="from" />
              </Col>
              <Col>
                <Field name="topic" label="Topic" type="text"
                  component={ReactstrapInput}
                />
              </Col>
            </FormGroup>
            {buttonGroup}
          </Form>
        )
      case SearchMode.POLITICIAN:
        return (
          <Form>
            <Field name="name" label="Name" type="text"
              component={ReactstrapInput}
            />
            <FormGroup row>
              <Col>
                <Field name="title" label="Title" type="text"
                    component={ReactstrapInput}
                />
              </Col>
              <Col>
                <Field name="position" label="Position" type="text"
                    component={ReactstrapInput}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Field
                  name="state" label="State" type="text"
                  component={ReactstrapSelect}
                  inputprops={{
                    label: "State",
                    options: germanStates
                  }}
                />
              </Col>
              <Col md="6">
                <Field name="city" label="City" type="text"
                    component={ReactstrapInput}
                  />
              </Col>

            </FormGroup>
            {buttonGroup}
          </Form>
        )
      case SearchMode.STUDENT:
        return (
          <Form>
            <Field name="name" label="Name" type="text"
              component={ReactstrapInput}
            />
            <FormGroup row>
              <Col>
                <Field name="title" label="Title" type="text"
                    component={ReactstrapInput}
                />
              </Col>
              <Col>
                <Field name="major" label="Major" type="text"
                    component={ReactstrapInput}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Field
                  name="state" label="State" type="text"
                  component={ReactstrapSelect}
                  inputprops={{
                    label: "State",
                    options: germanStates
                  }}
                />
              </Col>
              <Col md="6">
                <Field name="city" label="City" type="text"
                    component={ReactstrapInput}
                  />
              </Col>

            </FormGroup>
            {buttonGroup}
          </Form>
        )
    }
  }
  getNavs() {
    const { searchMode, switchMode } = this.props
    const { isPolitician } = this.props.user
    if(!isPolitician) return null
    return (
      <Nav tabs>
          {
            Object.keys(SearchMode).map(mode => (
              <NavItem>
                <NavLink
                  className={classnames({active: searchMode == mode })}
                  onClick={() => switchMode(mode)}
                >
                {mode}
                </NavLink>
              </NavItem>
            ))
          }
      </Nav>
    )
  }
  render() {
    const { searchParams, searchMode, close } = this.props
    return (
      <Modal
        isOpen={!!searchMode}
        toggle={close}>
        <ModalHeader toggle={close}>
          <Icon name="search" /> Search
        </ModalHeader>
        <ModalBody>
          {this.getNavs()}
          <Formik
            initialValues={searchParams[searchMode] || SearchInitialValue[searchMode]}
            validationSchema={SearchValidationSchema[searchMode]}
            render={this.getForm.bind(this)}
          >
        </Formik>
        </ModalBody>
      </Modal>
    )
  }
}


const mapStateToProps = state => ({
  ...state.search,
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  close: () => dispatch({
    type: SearchActions.CLOSE_SEARCH
  }),
  search: (params) => dispatch({
    type: SearchActions.SET_SEARCH_PARAMS,
    params
  }),
  switchMode: (mode) => dispatch({
    type: SearchActions.SET_SEARCH_MODE,
    mode
  })
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchModal)
)
