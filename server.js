import next from "next"
import express from "express"
import bodyParser from "body-parser"
import { ApolloServer, gql } from 'apollo-server-express'
import mongoose from 'mongoose';
import schema from './graphql/schema';
import { MONGO_URI } from './config/keys';

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))

// next.js setup
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
  const apollo = new ApolloServer({ schema });

  const app = express();
  apollo.applyMiddleware({ app });

  app.get('*', (req, res) => handle(req, res));

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${apollo.graphqlPath}`)
  );
});