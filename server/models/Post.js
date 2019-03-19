const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    image: {
      src: {
        type: String,
      },
    },

    category: {
      type: [String],
    },

    status: {
      type: String,
      enum: ['removed', 'draft', 'published', 'locked'],
      default: 'draft',
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
