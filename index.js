import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose'
import schema from './graphql/schema'
import { MONGO_URI } from './config/keys'
import User from "./models/User"


mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))


const server = new ApolloServer({
  schema,
  // context: ({ req }) => {
  //   // get the user token from the headers
  //   const token = req.headers.authorization || '';
  //   console.log(`headers: ${token}`)

  //   if (token) {
  //     const user = User.findOne({ email: email }).then(user => {
  //       return { user }
  //     })
  //   }
  // }
});


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});