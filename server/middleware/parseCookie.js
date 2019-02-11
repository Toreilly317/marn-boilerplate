const User = require('../models/User')

const parseCooker = async (req, res, next) => {
  if (req.session && req.session.user) {
    try {
      const user = await User.findOne({ email: req.session.user.email })
      if (user) {
        req.user = user
        req.session.id = user.id //refresh the session value
      }
    } catch (err) {
      console.log(err)
    }

    // finishing processing the middleware and run the route
    next()
  }
}

module.exports = parseCooker
