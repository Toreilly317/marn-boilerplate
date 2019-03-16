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

  const createGreeting = name => {
    const today = new Date()
    const curHr = today.getHours()
    let greeting

    if (curHr < 12) {
      greeting = `Good morning, ${name}`
    }
    else if (curHr < 18) {
      greeting = `Good afternoon, ${name}`
    }
    else {
      greeting = `ood evening, ${name}`
    }

    return <a href="/admin/dashboard">{greeting}</a>
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">SuperTightStartup.io</NavbarBrand>
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
                <DropdownItem>Profile</DropdownItem>
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
