const { SECRET } = process.env
const { UserInputError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Post = mongoose.model('Post')
const User = mongoose.model('User')

const userResolvers = {
  Query: {
    user: (root, { _id }) => User.findById(_id),
    users: (root, args, ctx, info) => User.find(),

    getCurrentUser: (root, args, context) => {
      const user = context.user
      return user
    },
  },

  User: {
    fullName: ({ firstName, lastName }, args) => `${firstName} ${lastName}`,
    posts: async ({ posts, _id }) => await Post.find({ author: _id }),
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

    signOut: (root, args, { session, res }) => {
      session.destroy()
      res
        .clearCookie('charm.sid', {
          httpOnly: true,
          secure: process.env === 'production',
          maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 day
        })
        .status(200)
        .send('Ok.')
    },
  },
}
module.exports = userResolvers
