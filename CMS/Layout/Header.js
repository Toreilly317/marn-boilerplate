import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  align-items: center;
  font-size: 2rem;
  height: 8rem;
  padding: 1rem 0;
  background: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.gray};
  margin-bottom: ${props => props.theme.sizes.xl};
`;

const HeaderBrand = styled.div`
  padding-left: ${props => props.theme.sizes.sm};
  font-size: 3rem;

  a {
    color: currentColor;
    text-decoration: none;
    &:visited {
      color: currentColor;
    }
  }
`;

const SearchBar = styled.input`
  height: 100%;
  padding: 1rem;
  color: ${props => props.theme.colors.gray};
  border: none;
  border-bottom: 1px solid black;
  background: ${props => props.theme.colors.black2};
`;

const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-left: ${props => props.theme.sizes.md};
  padding-right: ${props => props.theme.sizes.md};
`;

export default () => {
  const [state, setState] = useState();
  return (
    <Header>
      <HeaderBrand>BrandLogo</HeaderBrand>
      <SearchBar placeholder="Search" />
      <HeaderNav>
        <Link href="/admin/post/dashboard">
          <a>Posts</a>
        </Link>
        <Link href="/admin/pages/pages">
          <a>Pages</a>
        </Link>
        <Link href="/admin/media/dashboard">
          <a>Media</a>
        </Link>
      </HeaderNav>
    </Header>
  );
};
