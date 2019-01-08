import React, { Component } from 'react';
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

class Header extends Component {
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">SciCom</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/about">Über uns</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Login</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
    )
  }
}

export default Header
