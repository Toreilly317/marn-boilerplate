const Post = require('../../models/Post')
const mongoose = require('mongoose')
const UserInputError = require('apollo-server').UserInputError

const resolvers = {
  Query: {
    posts: (root, args, ctx, info) => {
      Post.find({})
    }
  }
}

module.exports = resolvers
