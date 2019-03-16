import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => (
  <div>
    <Header />
    <section>{children}</section>
    <Footer />
    <style jsx>
      {`
        h1 {
          color: red;
        }
      `}
    </style>
  </div>
)

export default Layout
