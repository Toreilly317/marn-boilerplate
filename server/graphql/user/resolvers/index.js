const User = require('../../../models/User')
const Post = require('../../../models/Post')



const bcrypt = require('bcryptjs')

const { SECRET } = process.env

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

    signIn: async (root, { email, password }, { res }) => {
      console.table({ email, password })
      const user = await User.findOne({ email })

      if (!user) {
        throw new UserInputError('User not found with this email')
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (isMatch) {
        const claims = {
          sub: user._id,
          email: user.email,
          iss: 'http://localhost:5000',
          permissions: user.permission
        };

        var token = jwt.sign(claims, SECRET, {
          expiresIn: 3600 // 1hour
        });

        res.cookie('jwt', token); // add cookie here
        return true
      } else {
        throw new UserInputError('Password incorrect')
      }
    },

    signOut: (root, args, { session, res }) => {
      session.destroy()
      res.clearCookie('charm.sid', {
        httpOnly: true,
        secure: process.env === 'production',
        maxAge: 14 * 24 * 60 * 60 * 1000 // expires in 14 day
      }).status(200).send('Ok.');

    },

    sayHello: (root, args, ctx) => {
      return 'Hello World'
    }
  }
}
module.exports = userResolvers
