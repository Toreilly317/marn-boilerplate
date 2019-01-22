const merge = require('lodash/merge')
const { makeExecutableSchema } = require('graphql-tools')

const userTypes = require('./users/userTypes')
const userResolvers = require('./users/userResolvers')
const postTypes = require('./posts/postTypes')
// const postResolvers = require('./posts/postResolvers')
const { gql } = require('apollo-server')

const Query = gql`
  type Query {
    #User Queries
    _empty: String
  }
`

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`

//currently we need to have these two dummy variables.
//This allows us to extend Query and Mutation within out types files

const typeDefs = [Query, Mutation, userTypes, postTypes]
const resolvers = merge(userResolvers)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema
