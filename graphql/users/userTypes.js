const { gql } = require('apollo-server')

const userTypes = gql`
  type User {
    _id: String!
    firstName: String!
    fullName: String!
    permission: String!
    lastName: String!
    email: String!
    posts: [String]
  }

  input newUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String
  }

  extend type Query {
    user(id: String!): User
    users(limit: Int): [User]
  }

  extend type Mutation {
    createUser(user: newUserInput): User
  }
`

module.exports = userTypes
