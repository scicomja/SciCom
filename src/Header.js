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
  DropdownItem
} from 'reactstrap'
import { LOGOUT } from './actions/auth'
class Header extends Component {
  /*

  */
  getNavItem() {
    if(this.props.user) {
      const { username } = this.props.user
      return (
        <Nav className="ml-auto" navbar>
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
  })
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
