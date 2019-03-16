import React, { useState } from 'react'
import { Mutation, withApollo } from 'react-apollo'
import {
  Button, Container, Form, FormGroup, FormText, Label, Input,
} from 'reactstrap'
import cookie from 'cookie'
import gql from 'graphql-tag'
import redirect from '../../lib/redirect'

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`

// TODO: Find a better name for component.
const SignInForm = ({ client }) => {
  const [state, setState] = useState({ email: '', password: '' })

  const handleOnChange = e => setState({
    ...state,
    [e.target.name]: e.target.value,
  })

  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={data => {
        document.cookie = cookie.serialize('token', data.signIn.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
        })
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
          <Form
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()

              signIn({
                variables: {
                  email: state.email,
                  password: state.password,
                },
              })

              setState({ email: '', password: '' })
            }}
          >
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              {error && <FormText>No user found with that information.</FormText>}
              <Input
                onChange={e => handleOnChange(e)}
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                onChange={e => handleOnChange(e)}
                type="password"
                name="password"
                id="password"
                placeholder="password placeholder"
              />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Container>
      )}
    </Mutation>
  )
}

export default withApollo(SignInForm)
