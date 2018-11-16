import Post from "../models/Post"
import { UserTC } from './UserSchema'
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { TypeComposer } from 'graphql-compose';
let customizationOptions = {}
export const PostTC = composeWithMongoose(Post, customizationOptions);

PostTC.addRelation('author', {
  resolver: () => UserTC.getResolver('findById'),
  prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
    id: (source) => source.author,
  },
  projection: { author: true }
})

export const postQueries = {
  postById: PostTC.getResolver('findById'),
  postsById: PostTC.getResolver('findByIds'),
  // postOne: PostTC.getResolver('findOne'),
  // postMany: PostTC.getResolver('findMany'),
  // postCount: PostTC.getResolver('count'),
  // postConnection: PostTC.getResolver('connection'),
  // postPagination: PostTC.getResolver('pagination')
}

export const postMutations = {
  postCreateOne: PostTC.getResolver('createOne'),
  // postCreateMany: PostTC.getResolver('createMany'),
  postUpdateById: PostTC.getResolver('updateById'),
  // postUpdateOne: PostTC.getResolver('updateOne'),
  // postUpdateMany: PostTC.getResolver('updateMany'),
  postRemoveById: PostTC.getResolver('removeById'),
  // postRemoveOne: PostTC.getResolver('removeOne'),
  postRemoveMany: PostTC.getResolver('removeMany'),
}

