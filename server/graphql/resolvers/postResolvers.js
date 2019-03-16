const mongoose = require('mongoose')

const Post = mongoose.model('Post')
const User = mongoose.model('User')

const resolvers = {
  Query: {
    postById: async (root, { id }) => Post.findById(id),
    allPosts: async (root, { limit }) => Post.find({})
      .populate('author')
      .limit(limit),
  },

  Mutation: {
    createPost: async (root, args, { user }) => {
      const { title, body, image } = args.post

      /* TODO valiate post args */
      const newPost = new Post({
        title,
        body,
        image: image || '',
        author: {
          id: user.id,
          name: user.fullName,
        },
      })

      return newPost
        .save()
        .then(post => post)
        .catch(err => err)
    },
  },
}

module.exports = resolvers
