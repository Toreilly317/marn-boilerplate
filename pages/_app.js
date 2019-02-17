import { ApolloProvider } from 'react-apollo'
import { createGlobalStyle } from 'styled-components'
import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'
import withApollo from '../lib/withApollo'

const GlobalStyle = createGlobalStyle`
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
  @import url('https://fonts.googleapis.com/css?family=Raleway|Roboto');
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
  font-size: 2rem;
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
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
