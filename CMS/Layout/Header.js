import styled from 'styled-components';
import Link from 'next/link';

const Header = styled.header`
  background: #121212;
  padding: 0.5rem;
  display: flex;
`;

const HeaderNav = styled.nav`
  padding: 5px;
  border-bottom: 2px solid #1212;
  color: #efefef;
  font-size: 1.2rem;
  display: flex;
  justify-self: flex-end;

  width: 100%;
  justify-content: flex-end;
  align-items: center;

  & div {
    &:not(:last-child) {
      padding-right: 1rem;
    }

    img {
      margin-right: 10px;
      max-height: 40px;
      border-radius: 100%;
      display: inline-block;
    }
  }
`;

const Pill = styled.div`
  background: white;
  border: 2px solid red;
  cursor: pointer;
  border-radius: 3px;
  &:not(:last-child) {
    margin-right: 1rem;
  }

  color: black;
  padding: 5px;
  font-size: 1rem;
`;

const BurgerButton = styled.div`
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  flex-direction: column;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  text-align: center;
  & div {
    height: 5px;
    width: 35px;
    background: white;

    margin: 4px;
  }
`;

export default ({ setMenuOpen }) => (
  <Header>
    <BurgerButton onClick={() => setMenuOpen()}>
      <div />
      <div />
      <div />
    </BurgerButton>

    <HeaderNav>
      <Pill>💬 3</Pill>
      <Pill>✉️ 5</Pill>
      <Pill>🔔 8</Pill>
    </HeaderNav>
  </Header>
);
