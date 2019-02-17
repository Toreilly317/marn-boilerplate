const { makeExecutableSchema } = require('graphql-tools')
const { gql } = require('apollo-server')

const { types, resolvers } = require('./createSchema')

/* currently we need to have these _empty types.
This allows us to extend Query and Mutation within and keep schema modular */
const Query = gql`
  type Query {
    _empty: String
  }
`

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`

const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, ...types],
  resolvers,
})

module.exports = schema
