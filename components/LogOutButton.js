import { Mutation, withApollo } from 'react-apollo'
import { gql } from 'apollo-boost'
import redirect from '../lib/redirect'

const SIGN_OUT = gql`
  mutation signOut() {
    signOut()
  }
`

// TODO: Find a better name for component.
const SignOutButton = ({ client }) => {


  return (
    <Mutation
      mutation={SIGN_OUT}
      onCompleted={data => {


        client.cache.reset().then(() => {
          redirect({}, '/admin/login')
        })
      }}
      onError={error => {
        // If you want to send error to external service?
        console.log(error)
      }}
    >
      {(signOut, { data, error }) => (
        <>
          <button onClick={() => signOut()}>Sign Out</button>
          {error && <p>There was an error Signing Out. {error}</p>}
        </>
      )}
    </Mutation>
  )
}

export default withApollo(SignOutButton)
