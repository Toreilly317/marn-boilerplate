import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import withApollo from '../lib/withApollo';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Nunito');
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
  font-family: "Nunito", sans-serif;
  background: #212121;
  font-size: 1.6rem;
  color: #535353;
  
  line-height: 1.6;
}

a {
    color: currentColor;
    text-decoration: none;
    &:visited {
      color: currentColor;
    }
  }
`;

const theme = {
  colors: {
    primary: '#2C2C34',
    secondary: '#494850',
    accent: '#978897',
    black: '#121212',
    black2: '#212121',
    gray: '#535353',
    gray2: '#b3b3b3',
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
};

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <Head>
          <title>NextPress</title>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        </Head>
        <ApolloProvider client={apolloClient}>
          <ApolloHooksProvider>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
