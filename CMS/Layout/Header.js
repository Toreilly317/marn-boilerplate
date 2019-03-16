import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import Link from 'next/link'
import useToggle from '../hooks/useToggle'

const Header = props => {
  const { user } = props
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">CHARM CMS</NavbarBrand>
        <NavbarToggler onClick={() => toggleIsOpen()} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/post/dashboard">Posts</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/pages/dashboard">Pages</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {props.user ? props.user.firstName : 'User'}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Account</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Sign Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Header
