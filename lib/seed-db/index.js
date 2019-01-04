
import Seeder from "./Seeder";
import User from "../../models/User"
import Post from "../../models/Post"


const models = [
  [User, { count: 10 }],
  [Post, { count: 10 }]
]

const seeder = new Seeder(models)
seeder.build()


