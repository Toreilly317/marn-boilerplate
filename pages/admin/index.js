import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import Header from '../../components/Header'

import redirect from '../../lib/redirect'
import checkLoggedIn from '../../lib/checkLoggedIn'

export default class Index extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (!loggedInUser) {
      // If not signed in, send them somewhere more useful
      return redirect(context, '/admin/login')
    } else {
      console.log('Logged in user', loggedInUser)
    }

    return { loggedInUser }
  }

  signout = apolloClient => () => {
    localStorage.removeItem('token')

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
            <Header />
            Hello {this.props.loggedInUser.firstName}{' '}
            {this.props.loggedInUser.lastName}!<br />
            <button onClick={this.signout(client)}>Sign out</button>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}
