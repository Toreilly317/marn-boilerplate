import gql from 'graphql-tag'

export default apolloClient => apolloClient
  .query({
    query: gql`
        query getCurrentUser {
          getCurrentUser {
            firstName
            lastName
            email
            id
          }
        }
      `,
  })
  .then(({ data }) => ({ loggedInUser: data.getCurrentUser }))
  .catch(err => {
    console.log(err)
    // Fail gracefully
    return { loggedInUser: null }
  })
