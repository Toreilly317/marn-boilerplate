import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Layout from '../components/Layout/Layout'

const GET_POSTS = gql`
  {
    allPosts(limit: 10) {
      id
      title
      status
      createdAt
      author {
        id
        firstName
        fullName
        email
      }
    }
  }
`

export default () => (
  <Layout>
    <Query query={GET_POSTS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`
        return (
          <>
            {data.allPosts.map(post => (
              <div key={post.id} style={{ border: '1px solid black', marginBottom: '5px' }}>
                <div>Title: {post.title}</div>
                <div>Last updated: {post.updatedAt}</div>
                <div>Author: {post.author.fullName}</div>
              </div>
            ))}
          </>
        )
      }}
    </Query>
    <h1>This is the content Area</h1>
  </Layout>
)
