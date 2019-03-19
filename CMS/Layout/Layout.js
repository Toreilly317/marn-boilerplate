import React from 'react'
import styled from 'styled-components'
import { Col } from 'reactstrap'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, user }) => (
  <>
    <Header user={user} />
    <Col>{children}</Col>
    <Footer />
  </>
)

export default Layout
