const { gql } = require('apollo-server')

const postTypes = gql`
  type Post {
    _id: String!
    title: String!
    body: String!
    image: String!
    author: User
  }
`

module.exports = postTypes
