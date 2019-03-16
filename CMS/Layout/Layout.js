import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'

const Main = styled.div`
  z-index: 100;
  flex-grow: 1; /*ensures that the container will take up the full height of the parent container*/
  overflow-y: auto; /*adds scroll to this container*/
`

const Layout = ({ children, user }) => (
  <>
    <Main>
      <Header user={user} toggleSidebar={toggleIsOpen} />
      <button onClick={() => toggleIsOpen()}>OPEN</button>
      <section>{children}</section>
      <Footer />
    </Main>
  </>
)

export default Layout
