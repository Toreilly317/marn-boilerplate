require('dotenv')
const next = require('next')
const express = require('express')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const { ApolloServer } = require('apollo-server-express')
const schema = require('./graphql/schema')
const mongoose = require('mongoose')

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

  //create the session with monogo as session store
  app.use(
    session({
      name: 'charm.sid',
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env === 'production',
        maxAge: 14 * 24 * 60 * 60 * 1000 // expires in 14 day
      },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60 // save session 14 days
      })
    })
  )

  const server = new ApolloServer({
    schema,
    playground: process.env !== 'production',
    context: async ({ req }) => {
      const { user, session } = req
      return { models, session, user }
    }
  })

  server.applyMiddleware({ app })

  app.get('/post/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id }
    nextApp.render(req, res, actualPage, queryParams)
  })

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}/${server.graphqlPath}`
    )
  )
})
