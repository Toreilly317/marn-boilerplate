const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const mongoose = require('mongoose')

const User = mongoose.model('User')

const { SECRET } = process.env

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = SECRET

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findById(payload.sub)
        .then(user => {
          if (user) {
            console.log('WE FOUND A USER', user.id, user.email)
            return done(null, user)
          }
          return done(null, false)
        })
        .catch(err => console.log(err))
    }),
  )
}
