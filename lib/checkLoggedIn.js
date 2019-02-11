import { gql } from 'apollo-boost'

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query getCurrentUser {
          getCurrentUser {
            _id
            firstName
            lastName
            email
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data.getCurrentUser }
    })
    .catch(err => {
      console.log(err)
      // Fail gracefully
      return { loggedInUser: null }
    })
