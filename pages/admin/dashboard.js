import React from 'react'
import { ApolloConsumer } from 'react-apollo'

import redirect from '../../lib/redirect'
import checkLoggedIn from '../../lib/checkLoggedIn'

export default class Signin extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (!loggedInUser) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/admin/login')
    }

    return { loggedInUser }
  }

  signout = apolloClient => () => {
    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/admin/login')
    })
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div>
            Hello {this.props.loggedInUser.firstName}!<br />
            <button onClick={this.signout(client)}>Sign out</button>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}
