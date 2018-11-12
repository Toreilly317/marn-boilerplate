import Post from "../models/Post"
import { composeWithMongoose } from 'graphql-compose-mongoose';

let customizationOptions = {}
const PostTC = composeWithMongoose(Post, customizationOptions);



export const postQueries = {
  postById: PostTC.getResolver('findById'),
  postsById: PostTC.getResolver('findByIds'),
  postOne: PostTC.getResolver('findOne'),
  postMany: PostTC.getResolver('findMany'),
  postCount: PostTC.getResolver('count'),
  postConnection: PostTC.getResolver('connection'),
  postPagination: PostTC.getResolver('pagination')
}

export const postMutations = {
  postCreateOne: PostTC.getResolver('createOne'),
  postCreateMany: PostTC.getResolver('createMany'),
  postUpdateById: PostTC.getResolver('updateById'),
  postUpdateOne: PostTC.getResolver('updateOne'),
  postUpdateMany: PostTC.getResolver('updateMany'),
  postRemoveById: PostTC.getResolver('removeById'),
  postRemoveOne: PostTC.getResolver('removeOne'),
  postRemoveMany: PostTC.getResolver('removeMany'),
}


export default { PostTC, postQueries, postMutations }