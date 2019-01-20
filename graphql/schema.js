import { makeExecutableSchema } from 'graphql-tools'
import { typeDef as Author } from './typeDefs/author.js'
import { typeDef as Book } from './typeDefs/book.js'

const Query = `
  type Query {
    author(id: Int!): Book
    book(id: Int!): Author
  }
`

const resolvers = {
  Query: {
    author: () => {
      console.log('author')
    },
    book: () => {
      console.log('books')
    }
  },
  Author: {
    name: () => {
      console.log('author')
    }
  },
  Book: {
    title: () => {
      console.log('books')
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs: [Query, Author, Book],
  resolvers: {}
})

export default schema
