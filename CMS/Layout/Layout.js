import { useState } from 'react';
import Header from './Header';
import Menu from './Menu';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Menu
        isOpen={isOpen}
        closeMenu={() => {
          setIsOpen(false);
        }}
      />

      <div>
        <Header setMenuOpen={() => setIsOpen(true)} />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
