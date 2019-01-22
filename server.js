const next = require('next')
const express = require('express')
const ApolloServer = require('apollo-server-express').ApolloServer
const mongoose = require('mongoose')
const schema = require('./graphql/schema')
const MONGO_URI = require('./config/keys').MONGO_URI
const User = require('./models/User')
const faker = require('faker')

const newUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'password123',
  posts: []
}

// next.js setup
const port = process.env.PORT || 5000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('DB connected'))

nextApp.prepare().then(() => {
  const server = new ApolloServer({ schema, playground: true })

  const app = express()
  server.applyMiddleware({ app })

  app.get('/post/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id }
    nextApp.render(req, res, actualPage, queryParams)
  })

  app.get('*', (req, res) => handle(req, res))

  app.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}/${server.graphqlPath}`
    )
  )
})

// User.create(newUser).then(user => console.log(`created User: ${user}`))
