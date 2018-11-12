import User from "../models/User"
import PostTC from "./PostSchema"

import { composeWithMongoose } from "graphql-compose-mongoose"
import { toInputObjectType } from 'graphql-compose'

let customizationOptions = {}
const UserTC = composeWithMongoose(User, customizationOptions);
UserTC.removeField('password')


/*********************************
            RELATIONS
/*********************************/
UserTC.addRelation('posts', {
  resolver: () => UserTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ author: source.id }),
  },
  projection: { id: true },
});

UserTC.addResolver({
  name: 'register',
  type: UserTC,
  description: "Register a new user",
  args: { record: toInputObjectType(UserTC), },
  resolve: async ({ source, args, context, info }) => {

    const newUser = new User(args.record)

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
      });
    });
  }
});



export const userQueries = {
  userById: UserTC.getResolver('findById'),
  usersById: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination')
}

export const userMutations = {
  userRegister: UserTC.getResolver('register'),
  // userLogin: UserTC.getResolver('login'),
  userUpdateById: UserTC.getResolver('updateById'),
  userRemoveById: UserTC.getResolver('removeById'),
}


export default { userQueries, userMutations }