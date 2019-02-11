import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import mongoose from 'mongoose'
const User = mongoose.model('User')
const { JWT_SECRET } = process.env

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = JWT_SECRET
// opts.issuer = 'charm.website.com'
// opts.audience = 'yoursite.net'

const startPassport = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .then(user => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch(err => console.log(err))
    })
  )
}

export default startPassport
