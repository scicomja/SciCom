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

import logo from "./logo.png"
import * as ModalActions from "./actions/modal"
import * as SearchActions from "./actions/search"
import { ModalMode, colors } from "./constants"
import { LOGOUT } from "./actions/auth"
import Icon from "./components/icon"

class Header extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isCollapsed: true
		}
	}
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

					<NavItem>
						<NavLink href="/about">Über uns</NavLink>
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
				</Nav>
			)
		}
	}
	render() {
		return (
			<Navbar color="dark" style={style.header} dark expand="md">
				<NavbarBrand href="/">
					<img src={logo} alt="SciCom" style={style.logo} />
				</NavbarBrand>
				<NavbarToggler
					onClick={() =>
						this.setState({ isCollapsed: !this.state.isCollapsed })
					}
					className="mr-2"
				/>
				<Collapse navbar isOpen={!this.state.isCollapsed}>
					{this.getNavItem()}
				</Collapse>
			</Navbar>
		)
	}
}
const style = {
	header: {
		flex: 1,
		minHeight: "13vh",
		backgroundColor: colors.primary
	},
	logo: {
		maxHeight: "100%",
		maxWidth: 168
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
			type: SearchActions.OPEN_SEARCH_MODAL
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
