const { gql } = require('apollo-boost')

const postTypes = gql`
  enum PostStatus {
    draft
    published
    removed
    scheduled
  }

  type Post {
    id: String!
    status: PostStatus!
    title: String!
    body: String!
    image: File
    author: User!
    createdAt: String!
    updatedAt: String!
  }

  input PostInput {
    title: String!
    body: String!
    image: String
    author: String
  }

  extend type Query {
    postById(id: String!): Post
    allPosts(limit: Int!): [Post]
  }

  extend type Mutation {
    createPost(post: PostInput): Post
  }
`

module.exports = postTypes
