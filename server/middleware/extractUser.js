const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = mongoose.model('User')
const { SECRET } = process.env

const parseBearerToken = bearerToken => {
  if (!bearerToken) {
    return null
  }

  const [schema, token] = bearerToken.split(' ')

  if (schema.toLowerCase() !== 'bearer') {
    return null
  }

  return token.trim()
}

const extractUser = (req, res, next) => {
  const bearerToken = req.headers.authorization
  const token = parseBearerToken(bearerToken)

  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        console.log('ERROR', err)
        return err
      }
      req.user = {
        id: decoded.sub,
        email: decoded.email,
      }
    })
  }
  next()
}

module.exports = extractUser
