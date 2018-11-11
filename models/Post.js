const mongoose = require("mongoose");
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
  }
});

const Post = mongoose.model("post", PostSchema);


const customizationOptions = {}

// left it empty for simplicity, described below
const PostTC = composeWithMongoose(Post, customizationOptions);


export default PostTC