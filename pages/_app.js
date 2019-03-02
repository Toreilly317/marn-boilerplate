import { ApolloProvider } from 'react-apollo'
import { createGlobalStyle } from 'styled-components'
import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { css, ThemeProvider } from 'styled-components'
import withApollo from '../lib/withApollo'

const theme = {
  colors: {
    primary: '#2C2C34',
    secondary: '#494850',
    accent: '#978897',
  },

  sizes: {
    xsm: '.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  typography: {
    xsm: '1.2rem',
    sm: '1.6rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem',
    xxl: '5rem',
  },
}

const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css?family=Raleway|Roboto');;

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
}

@media only screen and (max-width: 75em) {
  html {
    font-size: 50%;
  }
}

body {
 
  font-family: 'Raleway', sans-serif;
  color: #6d5d4b;
  font-weight: 300;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Nunito', sans-serif;
  text-transform: uppercase;
}

h1 {
  font-size: 5rem;
}

button: {
  font-family: "Raleway", sans-serif
}
  `

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <GlobalStyle />
        <Head>
          <title>Charm CMS</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
