import React, { useState } from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const Nav = styled.nav`
position: absolute;
top: 0;
left: 0;
transform: ${props => (props.open ? '' : 'translateX(-100%)')};
background: white;
height: 100vh;
transition: all .5s ease;
padding: 0;
width: 250px;
font-size: 1.2rem;
background: #212121;

ul {
  
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
  
 
  li {
    display: flex;
    &:hover {
      background: #121212;
      cursor: pointer;
    }
    padding: .5rem .5rem .5rem .5rem;
    justify-content: space-between;
    background: #212121;
    color: #efefef;
    align-items: center;
    align-items: space-between;
    button {
      font-size: 2rem;
      width: 50px;
      height:50px;
      background: none;
      outline: none;
      border: none;
      color: white;
    }
  }
}
}
`;

const Menu = ({ isOpen, closeMenu }) => (
  <Nav open={isOpen}>
    <div
      style={{ textAlign: 'right', padding: '.2rem' }}
      onClick={() => closeMenu()}
    >
      ❌
    </div>
    <ul>
      <MenuItem href="#" text="Analytics" icon="🕵" />
      <MenuItem href="/admin/post/dashboard" text="Posts" icon="🗏" />
      <MenuItem href="/pages/dashboard" text="Pages" icon="🗐" />
      <MenuItem href="#" text="Users" icon="🐛" />
      <MenuItem href="#" text="Mesages" icon="📥" />
      <MenuItem href="/media/dashboard" text="Media" icon="🖼️" />
      <MenuItem href="#" text="Settings" icon="⚙️" />
      <MenuItem href="#" text="sign Out" icon="🚪" />
    </ul>
  </Nav>
);

export default Menu;
