import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import Header from '../../components/Header'

import redirect from '../../lib/redirect'
import checkLoggedIn from '../../lib/checkLoggedIn'
import LogOutButton from "../../components/LogOutButton"

export default class Index extends React.Component {
  static async getInitialProps(context, apolloClient) {
    // const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    // if (!loggedInUser) {
    //   // If not signed in, send them somewhere more useful
    //   return redirect(context, '/admin/login')
    // } else {
    // }

    // return { loggedInUser }
  }



  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div>
            <Header />
            Hello {this.props.loggedInUser.firstName}{' '}
            {this.props.loggedInUser.lastName}!<br />
            <LogOutButton />
          </div>
        )}
      </ApolloConsumer>
    )
  }
}
