import React from 'react'
import { Mutation, withApollo } from 'react-apollo'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import redirect from '../lib/redirect'
import Input from './styled/Input'
import Button from './styled/Button'

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.primary.dark};
  display: flex;
  justify-content: center;
  align-items: center;
`

// TODO: Find a better name for component.
const SigninBox = ({ client }) => {
  let email,
    password

  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={data => {
        localStorage.setItem('token', data.signIn.token)
        // Force a reload of all the current queries now that the user is
        // logged in
        client.cache.reset().then(() => {
          redirect({}, '/admin/dashboard')
        })
      }}
      onError={error => {
        // If you want to send error to external service?
        console.log(error)
      }}
    >
      {(signIn, { data, error }) => (
        <Container>
          <form
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()

              signIn({
                variables: {
                  email: email.value,
                  password: password.value,
                },
              })

              email.value = password.value = ''
            }}
          >
            {error && <p>No user found with that information.</p>}
            <Input
              name="email"
              type="email"
              placeholder="Email"
              ref={node => {
                email = node
              }}
            />
            <br />
            <Input
              name="password"
              placeholder="Password"
              ref={node => {
                password = node
              }}
              type="password"
            />
            <br />
            <Button type="submit">Sign in</Button>
          </form>
        </Container>
      )}
    </Mutation>
  )
}

export default withApollo(SigninBox)
