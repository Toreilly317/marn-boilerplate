import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: #2a3642;
`

const Header = styled.header`
  background: #2a3642;
  height: 7rem;
  color: #535f6b;
  display: flex;
  padding: 0 1.5rem;
  align-items: center;

  a {
    color: currentColor
    font-size: 2.5rem;
    text-decoration: none;
  }
`

const Burger = styled.div`
  display: flex;
  cursor: pointer;
  background: red;
  width: 40px;
  height: 50%;
  flex-direction: column;
  justify-content: space-around;
  div {
    background: white;
    height: 1px;
    border-radius: 100px;
    padding: 1px;
    margin: 4px;
  }
`

const HamburgerButton = () => (
  <Burger>
    <div />
    <div />
    <div />
  </Burger>
)

const HeaderLogo = props => (
  <div>
    <a style={{ color: 'currentColor' }} href={props.href}>
      {' '}





      CharmCMS
    </a>
  </div>
)

export default () => (
  <Container>
    <Header>
      <HamburgerButton />
      <a href="/admin/dashboard">Charm CMS</a>
    </Header>
  </Container>
)
