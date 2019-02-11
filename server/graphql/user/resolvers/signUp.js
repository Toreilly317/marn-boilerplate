const User = require('../../../models/User')
const { UserInputError } = require('apollo-server')
const createToken = require('./createToken')
const signUpValidation = require('../validation/signUpValidation')

const signUp = async (newUser, res) => {
  // const { errors, isValid } = signUpValidation(newUser)

  // if (errors) {
  //   throw new UserInputError(errors)
  // }

  const foundUser = await User.findOne({ email: newUser.email })
  //if user exists throw err
  if (foundUser) {
    throw new UserInputError('Email already exists')
  }

  const user = await User.create(newUser)
  const token = createToken(user)
  res.cookie('id', token, {
    httpOnly: true,
    secure: process.env === 'production',
    maxAge: 1000 * 60 * 24 * 7 // 7 days
  })

  return true
}

module.exports = signUp
