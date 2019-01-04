import Seeder from "./Seeder";
import User from "../../models/User"
import Post from "../../models/Post"



const config = {
  models: [
    [
      User,
      {
        count: 2,
        dropCollection: true,
        pools: {
          posts: ["Post", 1, 2]
        }
      }
    ],


    [Post, {
      count: 2, dropCollection: false, pools: {
        posts: ["User", 1, 2]
      }
    }]
  ],
  opts: {
    writeFilesOnly: false
  }
}


new Seeder(config).seed()






// const fields = [{
//   path: 'firstName',
//   instance: 'String',
//   enumValues: [],
//   ref: undefined
// },
// {
//   path: 'lastName',
//   instance: 'String',
//   enumValues: [],
//   ref: undefined
// },


// {
//   path: 'confirmed',
//   instance: 'Boolean',
//   enumValues: undefined,
//   ref: undefined
// },
// {
//   path: 'permission',
//   instance: 'String',
//   enumValues: ['admin', 'manager', 'user'],
//   ref: undefined
// },
// {
//   path: 'posts',
//   instance: 'Array',
//   enumValues: undefined,
//   ref: undefined
// },
// ]


