import { mergeSchemas } from 'graphql-tools'
import userSchema from "../models/User"
import postSchema from "../models/Post"



const schemas = [userSchema, postSchema]




const schema = mergeSchemas({ schemas })





export default { schema };