import React from 'react';
import MenuItem from './MenuItem';

const HeaderMenu = ({ signOut }) => (
  <ul className="header-menu">
    <MenuItem href="/shop" text="Home" />
    <MenuItem href="/orders" text="Blog" />
    <MenuItem href="/account" text="About" />
    <MenuItem href="/#" onClick={signOut} text="Sign Out" />
    <MenuItem href="/cart" text="Cart" />
    <style jsx>
      {`
        ul {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 2.5rem;
          list-style: none;
        }
      `}
    </style>
  </ul>
);

export default HeaderMenu;
