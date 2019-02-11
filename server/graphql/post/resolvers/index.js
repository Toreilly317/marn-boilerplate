const Post = require('../../../models/Post')
const mongoose = require('mongoose')
const { UserInputError } = require('apollo-server')

const resolvers = {
  Query: {
    postById: async (root, { _id }) => await Post.findById(_id),
    allPosts: async () => await Post.find({})
  },
  Mutation: {
    createPost: async (root, args) => await Post.create(args)
  }
}

module.exports = resolvers
