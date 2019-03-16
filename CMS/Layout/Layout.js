import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, user }) => (
  <>
    <Header user={user} />
    <section>{children}</section>
    <Footer />
  </>
)

export default Layout
