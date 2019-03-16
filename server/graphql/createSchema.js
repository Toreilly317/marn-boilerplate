const { merge } = require('lodash')

// types
const fileTypes = require('./types/fileTypes')
const userTypes = require('./types/userTypes')
const postTypes = require('./types/postTypes')
// resolvers
const userResolvers = require('./resolvers/userResolvers')
const postResolvers = require('./resolvers/postResolvers')
const fileResolvers = require('./resolvers/fileResolvers')

const types = [fileTypes, userTypes, postTypes]
const resolvers = merge(fileResolvers, userResolvers, postResolvers)

console.log(Object.keys(types))
console.log(Object.keys(resolvers))

module.exports = {
  types,
  resolvers,
}
