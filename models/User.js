import mongoose from 'mongoose';
import { KEY } from '../config/keys'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  permission: { type: String, required: true, enum: ["admin", "manager", "user"], default: "user" },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, {
    timestamps: true
  });


//hash PW before saving user
UserSchema.pre('save', function (next) {
  const user = this;

  const adminExists = User.find({ permission: 'admin' }, (err, record) => record);
  if (!adminExists) {
    user.permission = "admin";
  }



  //if password is not change, go to next middleware
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        console.log(error);
        next(err)
      }
      user.password = hash;
      next()
    });
  });

})


const User = mongoose.model('User', UserSchema);

export default User









