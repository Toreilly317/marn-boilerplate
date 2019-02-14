require('dotenv')
const next = require('next')
const express = require('express')
const passport = require('passport')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const schema = require('./graphql/schema')

const models = require('./models')

const { MONGO_URI, PORT, NODE_ENV } = process.env

// next.js setup
const dev = NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))

nextApp.prepare().then(() => {
  const app = express()

  app.use(passport.initialize())
  require('../lib/passport')(passport)


  const server = new ApolloServer({
    schema,
    playground: process.env !== 'production',
    context: async ({ req, res }) => {
      const { user } = req
      return {
        models, user, res,
      }
    },
  })

  server.applyMiddleware({ app })

  app.get('/post/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id }
    nextApp.render(req, res, actualPage, queryParams)
  })

  app.get('*', (req, res) => handle(req, res))

  app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}/${server.graphqlPath}`))
})
