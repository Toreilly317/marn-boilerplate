const { UserInputError } = require('apollo-server')
const mongoose = require('mongoose')

const Post = mongoose.model('Post')

const resolvers = {
  Query: {
    postById: async (root, { _id }) => await Post.findById(_id),
    allPosts: async () => await Post.find({}),
  },
  Mutation: {
    createPost: async (root, args) => await Post.create(args),
  },
}

module.exports = resolvers
