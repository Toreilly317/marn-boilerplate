import { schemaComposer } from 'graphql-compose';

import { userQueries, userMutations } from './UserSchema';

import { postQueries, postMutations } from './PostSchema';

schemaComposer.Query.addFields({
  ...userQueries,
  ...postQueries
})

schemaComposer.Mutation.addFields({
  ...userMutations,
  ...postMutations,

})

const schema = schemaComposer.buildSchema();

export default schema;