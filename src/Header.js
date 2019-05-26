import React, { Component } from "react"
import { connect } from "react-redux"
import {
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	Collapse,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from "reactstrap"

import * as ModalActions from "./actions/modal"
import * as SearchActions from "./actions/search"
import { ModalMode, SearchMode, colors } from "./constants"
import { LOGOUT } from "./actions/auth"
import Icon from "./components/icon"

class Header extends Component {
	getSearchNavItems() {
		if (!this.props.user) return null
		const { isPolitician } = this.props.user
		return (
			<NavItem>
				<NavLink onClick={this.props.searchProjects}>Search</NavLink>
			</NavItem>
		)
	}
	getNavItem() {
		if (this.props.user) {
			const { username } = this.props.user
			return (
				<Nav className="ml-auto" navbar>
					{this.getSearchNavItems()}
					<NavItem>
						<NavLink href="/user"> {username} </NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/" onClick={this.props.logout}>
							{" "}
							Logout{" "}
						</NavLink>
					</NavItem>
				</Nav>
			)
		} else {
			// not logged in...
			return (
				<Nav className="ml-auto" navbar>
					{this.getSearchNavItems()}
					<NavItem>
						<NavLink href="/about">Über uns</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/">Loginseite</NavLink>
					</NavItem>
				</Nav>
			)
		}
	}
	render() {
		return (
			<Navbar color="dark" style={style.header} dark expand="md">
				<NavbarBrand href="/">SciCom</NavbarBrand>
				{this.getNavItem()}
			</Navbar>
		)
	}
}
const style = {
	header: {
		backgroundColor: colors.primary
	}
}
const mapStateToProps = state => ({
	user: state.auth.user
})
const mapDispatchToProps = dispatch => ({
	logout: () =>
		dispatch({
			type: LOGOUT
		}),
	searchProjects: () =>
		dispatch({
			type: SearchActions.OPEN_SEARCH_MODAL,
			mode: SearchMode.PROJECT
		}),
	searchStudents: () =>
		dispatch({
			type: SearchActions.OPEN_SEARCH_MODAL,
			mode: SearchMode.STUDENT
		}),
	searchPoliticians: () =>
		dispatch({
			type: SearchActions.OPEN_SEARCH_MODAL,
			mode: SearchMode.POLITICIAN
		}),
	createProject: () =>
		dispatch({
			type: ModalActions.CREATE_PROJECT
		})
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
