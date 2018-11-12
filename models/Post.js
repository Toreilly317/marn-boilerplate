import mongoose from 'mongoose'
const Schema = mongoose.Schema;

import { composeWithMongoose } from 'graphql-compose-mongoose';


const PostSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  body: {
    type: String,
    required: true
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Post = mongoose.model("post", PostSchema);

export default Post