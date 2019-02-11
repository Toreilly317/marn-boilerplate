const User = require('../../../models/User')
const Post = require('../../../models/Post')
const { ApolloError } = require('apollo-server')

const bcrypt = require('bcryptjs')

const userResolvers = {
  Query: {
    user: (root, { _id }) => User.findById(_id),
    users: (root, args, ctx, info) => User.find(),

    getCurrentUser: async (root, args, { session }) => {
      if (session && session.user) {
        const user = await User.findOne({ email: session.user.email }).select(
          '-password'
        )

        return user
      }
    }
  },

  User: {
    fullName: ({ firstName, lastName }, args) => `${firstName} ${lastName}`,
    posts: async ({ posts, _id }) => await Post.find({ author: _id })
  },

  Mutation: {
    signUp: async (parent, args, ctx) => {
      console.log(args)
      console.log('+++++++++++++++++++++++++++++++')
      console.log(ctx)
      return true
    },

    signIn: async (root, { email, password }, { session }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw new UserInputError('User not found with this email')
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (isMatch) {
        delete user.password
        if (session) {
          session.user = user
          return true
        } else {
        }
      } else {
        throw new UserInputError('Password incorrect')
      }
    },

    sayHello: (root, args, ctx) => {
      return 'Hello World'
    }
  }
}
module.exports = userResolvers
