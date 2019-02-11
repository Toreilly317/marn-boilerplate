const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      validate: {
        validator: async email => {
          await (User.where({ email }).countDocuments() === 0)
        },
        message: ({ value }) =>
          `an account with the email ${value} already exists`
      },
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    verified: {
      type: Boolean,
      default: false
    },
    password: { type: String, required: true, trim: true },
    permission: {
      type: String,
      required: true,
      enum: ['ADMIN', 'MANAGER', 'USER'],
      default: 'USER'
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
  },
  {
    timestamps: true
  }
)

//hash PW before saving user
UserSchema.pre('save', function(next) {
  const user = this
  //if password is not change, go to next middleware
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        next(err)
      }
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err)
    }

    cb(null, isMatch)
  })
}

const User = mongoose.model('User', UserSchema)

module.exports = User
