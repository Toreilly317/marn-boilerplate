const jwt = require('jsonwebtoken')
const { SECRET } = process.env

const createToken = async user => {
  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    verified: user.verified,
    permission: user.permission,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }

  const token = await jwt.sign(payload, SECRET, { expiresIn: '24h' })
  return {
    token: `Bearer ${token}`
  }
}

module.exports = createToken
