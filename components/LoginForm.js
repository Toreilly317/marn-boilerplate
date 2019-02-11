import { Mutation, withApollo } from 'react-apollo'
import { gql } from 'apollo-boost'
import redirect from '../lib/redirect'

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`

// TODO: Find a better name for component.
const SigninBox = ({ client }) => {
  let email, password

  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={data => {
        console.log('Sign In Data', data)
        // Store the token in cookie
        if (data.signIn == true) {
          console.log('Signed In')
        } else {
          console.log('not signed in')
        }

        // Force a reload of all the current queries now that the user is
        // logged in
        client.cache.reset().then(() => {
          redirect({}, '/admin')
        })
      }}
      onError={error => {
        // If you want to send error to external service?
        console.log(error)
      }}
    >
      {(signIn, { data, error }) => (
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()

            signIn({
              variables: {
                email: email.value,
                password: password.value
              }
            })

            email.value = password.value = ''
          }}
        >
          {error && <p>No user found with that information.</p>}
          <input
            name="email"
            placeholder="Email"
            ref={node => {
              email = node
            }}
          />
          <br />
          <input
            name="password"
            placeholder="Password"
            ref={node => {
              password = node
            }}
            type="password"
          />
          <br />
          <button>Sign in</button>
        </form>
      )}
    </Mutation>
  )
}

export default withApollo(SigninBox)
