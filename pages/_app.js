import { ApolloProvider } from 'react-apollo'
import { createGlobalStyle } from 'styled-components'
import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { css, ThemeProvider } from 'styled-components'
import withApollo from '../lib/withApollo'
import '../lib/style.css'

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

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <Head>
          <title>NextPress</title>
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
