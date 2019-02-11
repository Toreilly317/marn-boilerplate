const { gql } = require('apollo-boost')

const postTypes = gql`
  type Post {
    _id: String!
    title: String!
    body: String!
    image: String!
    author: User
  }

  input PostInput {
    title: String!
    body: String!
    image: String
    author: String!
  }

  extend type Query {
    postById(_id: String!): Post
    allPosts: [Post]
  }

  extend type Mutation {
    createPost(post: PostInput): Post
  }
`

module.exports = postTypes
