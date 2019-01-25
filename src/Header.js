import React, { Component } from 'react'
import { connect } from 'react-redux'
import  {
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

  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import * as ModalActions from './actions/modal'
import { ModalMode } from './constants'
import { LOGOUT } from './actions/auth'
class Header extends Component {

  getSearchNavItems() {
    if(!this.props.user) return null
    const { isPolitician } = this.props.user
    let searchItems = [(
      <NavItem>
        <NavLink onClick={this.props.searchUsers}>
          Search Users
        </NavLink>
      </NavItem>
    )]
    if (!isPolitician) {
      searchItems.push((
        <NavItem>
          <NavLink onClick={this.props.searchProjects}>
            Search Projects
          </NavLink>
        </NavItem>
      ))
    } else {
      // politician can create projects
      searchItems = [(
        <NavItem>
          <NavLink onClick={this.props.createProject}>
            Create projects
          </NavLink>
        </NavItem>
      )].concat(searchItems)
    }

    return searchItems
  }
  getNavItem() {
    if(this.props.user) {
      const { username } = this.props.user
      return (
        <Nav className="ml-auto" navbar>
          {this.getSearchNavItems()}
          <NavItem>
            <NavLink href="/user"> {username} </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/" onClick={this.props.logout}> Logout </NavLink>
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
            <NavLink href="/">Login</NavLink>
          </NavItem>
        </Nav>
      )
    }
  }
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">SciCom</NavbarBrand>
        {this.getNavItem()}
      </Navbar>
    )
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
})
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({
    type: LOGOUT
  }),
  searchProjects: () => dispatch({
    type: ModalActions.SET_MODAL_TYPE,
    mode: ModalMode.SEARCH_PROJECT
  }),
  searchUsers: () => dispatch({
    type: ModalActions.SET_MODAL_TYPE,
    mode: ModalMode.SEARCH_USER
  }),
  createProject: () => dispatch({
    type: ModalActions.CREATE_PROJECT,
  })
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
