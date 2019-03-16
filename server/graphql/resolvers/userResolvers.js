const { SECRET } = process.env
const { UserInputError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Post = mongoose.model('Post')
const User = mongoose.model('User')

const userResolvers = {
  Query: {
    userById: (root, { id }) => User.findById(id),
    allUsers: (root, args, ctx, info) => User.find().limit(args.limit),
    getCurrentUser: (root, args, context) => User.findById(context.user.id),
  },

  User: {
    fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    posts: async ({ id }) => Post.find({ author: id }),
  },

  Mutation: {
    signUp: async (parent, args, ctx) => {
      console.log(args)
      console.log('+++++++++++++++++++++++++++++++')
      console.log(ctx)
      return true
    },

    signIn: async (root, { email, password }) => {
      const user = await User.findOne({ email }).select('+password')

      if (!user) {
        throw new UserInputError('User not found with this email')
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (isMatch) {
        const claims = {
          sub: user.id,
          email: user.email,
          iss: 'http://localhost:3000',
          permissions: user.permission,
        }

        const token = await jwt.sign(claims, SECRET, {
          expiresIn: 60 * 60 * 24,
        })

        return { token: `Bearer ${token}` }
      }
      throw new UserInputError('Password incorrect')
    },
  },
}
module.exports = userResolvers
