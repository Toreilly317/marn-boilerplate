import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import Layout from '../../CMS/Layout/Layout'

import redirect from '../../lib/redirect'
import checkLoggedIn from '../../lib/checkLoggedIn'

export default class Signin extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (!loggedInUser) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/admin/login')
    }

    return { loggedInUser }
  }

  signout = apolloClient => () => {
    console.log('SIGNING OUT')
    localStorage.removeItem('token')
    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.

    /*This was the signout function provided by the docs.
      however it does not seem to be redirecting correctly */
    apolloClient.cache.reset().then(() => {
      //apolloClient.resetStore()
      //remove token from localStorage

      // Redirect to a more useful page when signed out
      redirect({}, '/admin/login')
    })
  }
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Layout user={this.props.loggedInUser}>
            <div>
              Hello {this.props.loggedInUser.firstName}!<br />
              <button onClick={this.signout(client)}>Sign out</button>
            </div>
          </Layout>
        )}
      </ApolloConsumer>
    )
  }
}
