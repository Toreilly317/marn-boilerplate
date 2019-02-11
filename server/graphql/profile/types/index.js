const { gql } = require('apollo-server')

const userTypes = gql`
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
  }

  extend type Mutation {
    signUp(user: newUserInput): JWT!
    signIn(user: signInInput): JWT!
    sayHello: String
  }
`

export default userTypes
