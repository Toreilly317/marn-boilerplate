const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = mongoose.model('User')
const { SECRET } = process.env

const parseBearerToken = req => {
  const auth = req.headers ? req.headers.authorization || null : null
  if (!auth) {
    return null
  }

  const parts = auth.split(' ')
  // Malformed header.
  if (parts.length < 2) {
    return null
  }

  const schema = parts.shift().toLowerCase()
  const token = parts.join(' ')
  if (schema !== 'bearer') {
    return null
  }

  return token
}

const extractUser = async (req, res, done) => {
  const token = parseBearerToken(req)
  if (token) {
    const decoded = jwt.verify(token, SECRET)
    const user = await User.findById(decoded.sub).then(payload => payload)
    req.user = user
  }
  done()
}

module.exports = extractUser
