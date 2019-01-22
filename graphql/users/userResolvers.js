const User = require('../../models/User')
const Post = require('../../models/Post')
const mongoose = require('mongoose')
const UserInputError = require('apollo-server').UserInputError

const userResolvers = {
  Query: {
    users: (root, args, ctx, info) => {
      return User.find()
    }
  },

  User: {
    fullName: ({ firstName, lastName }, args) => {
      return `${firstName} ${lastName}`
    }
  },

  Mutation: {
    createUser: (parent, args, ctx) => {
      User.create({ args })
    }
  }
}

module.exports = userResolvers
