const jwt = require('jsonwebtoken')
const { SECRET } = process.env
const { ApolloError } = require('apollo-server')

const getcurrentUser = async ({ session }) => {
  if (session && session.user) {
    // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    try {
      const user = await User.findOne({ email: session.user.email }).select(
        '-password'
      )
      console.log('FOUND USER BY COOKIE', user)
      if (!user) {
        return { loggedInUser: false }
      }
    } catch (e) {
      return { loggedInUser: user }
    }
  }
}

module.exports = getcurrentUser
