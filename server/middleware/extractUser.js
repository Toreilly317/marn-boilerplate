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
        return err
      }
      const user = User.findById(decoded.sub)
        .then(payload => payload)
        .catch(e => console.log(e))
      req.user = user
    })
  }
  else {
    console.log('no token')
  }
  next()
}

module.exports = extractUser
