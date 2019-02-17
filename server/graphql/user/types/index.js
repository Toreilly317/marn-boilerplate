const { gql } = require('apollo-boost')

const userTypes = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    fullName: String!
    permission: String!
    verified: Boolean!
    email: String!
    createdAt: String
    updatedAt: String
    posts: [Post]
  }

  type JWT {
    token: String!
  }

  input newUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String
  }

  input signInInput {
    email: String!
    password: String!
  }

  extend type Query {
    profile: User
    user(_id: String!): User
    users(limit: Int): [User]
    getCurrentUser: User
  }

  extend type Mutation {
    signUp(email: String!, password: String!, firstName: String, lastName: String): JWT!
    signIn(email: String!, password: String!): JWT!
    signOut: Boolean!
    sayHello: String
  }
`

module.exports = userTypes
