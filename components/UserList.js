import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import ErrorMessage from './ErrorMessage'
import PostUpvoter from './PostUpvoter'

export const allUsersQuery = gql`
  query allUsers() {
    allUsers{
      _id
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`

export default function PostList() {
  return (
    <Query query={allUsersQuery}>
      {({ loading, error, data: { allUsers, _allPostsMeta } }) => {
        if (error) return <ErrorMessage message="Error loading posts." />
        if (loading) return <div>Loading</div>

        const areMorePosts = allUsers.length < _allPostsMeta.count
        return (
          <section>
            <ul>
              {allUsers.map((user, index) => (
                <li key={user._id}>
                  <div>
                    <span>{index + 1}. </span>
                    <p>ID: {user._id}</p>
                    <p>First Name: {user.email}</p>
                    <p>LastName: {user.email}</p>
                    <p>Email: {user.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )
      }}
    </Query>
  )
}
