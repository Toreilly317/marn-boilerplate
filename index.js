import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose'
import schema from './graphql/schema'
import { MONGO_URI } from './config/keys'


mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))


const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});