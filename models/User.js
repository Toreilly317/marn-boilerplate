import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { toInputObjectType, TypeComposer } from 'graphql-compose';
import bcrypt from 'bcryptjs'


const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, {
    timestamps: true
  });

const User = mongoose.model('User', UserSchema);
export default User









