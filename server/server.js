require('dotenv')
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const next = require('next')
const models = require('./models')
const extractUser = require('./middleware/extractUser')
const schema = require('./graphql/schema')

const {
  MONGO_URI, PORT, NODE_ENV, ADMIN_ROUTE,
} = process.env

// next.js setup
const dev = NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

mongoose.connect(MONGO_URI, { useNewUrlParser: true }).then(() => console.log('DB connected'))

nextApp.prepare().then(() => {
  const app = express()

  // add user object to every request
  // app.use(passport.initialize())
  // require('../lib/passport')(passport)
  // app.use(passport.authenticate('jwt', { session: false }))

  app.use(extractUser)

  // check headers

  // start apollo server
  const server = new ApolloServer({
    schema,
    playground: process.env !== 'production',
    context: ({ req }) => {
      const { user } = req
      return {
        models,
        user,
        req,
      }
    },
  })

  // apollo server takes express as middleware
  server.applyMiddleware({ app })

  app.get('/post/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id }
    nextApp.render(req, res, actualPage, queryParams)
  })

  app.get('*', (req, res) => {
    handle(req, res)
  })

  app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}/${server.graphqlPath}`))
})
