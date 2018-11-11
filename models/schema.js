import UserTC from "./User"
import PostTC from "./Post"
import { schemaComposer } from 'graphql-compose';

schemaComposer.Query.addFields({
  //POSTS
  postById: PostTC.getResolver('findById'),
  postsById: PostTC.getResolver('findByIds'),
  postOne: PostTC.getResolver('findOne'),
  postMany: PostTC.getResolver('findMany'),
  postCount: PostTC.getResolver('count'),
  postConnection: PostTC.getResolver('connection'),
  postPagination: PostTC.getResolver('pagination'),

  //Users
  userById: UserTC.getResolver('findById'),
  usersById: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
  postCreateOne: PostTC.getResolver('createOne'),
  postCreateMany: PostTC.getResolver('createMany'),
  postUpdateById: PostTC.getResolver('updateById'),
  postUpdateOne: PostTC.getResolver('updateOne'),
  postUpdateMany: PostTC.getResolver('updateMany'),
  postRemoveById: PostTC.getResolver('removeById'),
  postRemoveOne: PostTC.getResolver('removeOne'),
  postRemoveMany: PostTC.getResolver('removeMany'),

  userRegister: UserTC.getResolver('register'),
  userLogin: UserTC.getResolver('login'),
  userUpdateById: UserTC.getResolver('updateById'),
  userRemoveById: UserTC.getResolver('removeById'),
});


const schema = schemaComposer.buildSchema()
export default { schema }