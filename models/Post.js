import mongoose from 'mongoose'
const Schema = mongoose.Schema;

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
}, {
    timestamps: true
  });

const Post = mongoose.model("Post", PostSchema);

export default Post