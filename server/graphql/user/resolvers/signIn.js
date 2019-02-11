const { UserInputError } = require('apollo-server')
const createToken = require('./createToken')
const User = require('../../../models/User')
const bcrypt = require('bcryptjs')

const signIn = async ({ email, password }, { session }) => {
  console.table({ email, password })
  const user = await User.findOne({ email }).select('-password')

  if (!user) {
    throw new UserInputError('User not found with this email')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (isMatch) {
    if (session) {
      session.user = user
      console.log(session)
      return true
    } else {
    }
  } else {
    throw new UserInputError('Password incorrect')
  }
}

module.exports = signIn
