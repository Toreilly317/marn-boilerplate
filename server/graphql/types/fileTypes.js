const { gql } = require('apollo-boost')

const fileTypes = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  extend type Query {
    uploads: [File]
  }

  extend type Mutation {
    singleUpload(file: Upload!): File!
    multipleUpload(files: [Upload!]!): [File]!
  }
`

module.exports = fileTypes
