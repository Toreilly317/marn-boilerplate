import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const Menu = styled.div``;

const Nav = styled.nav`
  flex: 1;
  & ul {
    display: flex;
    justify-content: space-around;
    li {
      list-style: none;
    }
  }
`;

const HeaderMenu = props => (
  <Nav>
    <ul>
      <MenuItem href="/admin/dashboard" text="Home" />
      <MenuItem href="/post" text="Posts" />
      <MenuItem href="/account" text="Account" />
      <MenuItem href="/#" onClick={props.signOut} text="Sign Out" />
      <MenuItem href="/cart" text="Cart" />
    </ul>
  </Nav>
);

export default HeaderMenu;
