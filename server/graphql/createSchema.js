const merge = require('lodash').merge

//types
const userTypes = require('./user/types')
const postTypes = require('./post/types')

//resolvers
const userResolvers = require('./user/resolvers')
const postResolvers = require('./post/resolvers')

const types = [userTypes, postTypes]
const resolvers = merge(userResolvers, postResolvers)

module.exports = {
  types,
  resolvers
}
