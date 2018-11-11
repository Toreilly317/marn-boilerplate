import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { toInputObjectType, TypeComposer } from 'graphql-compose';
import bcrypt from 'bcryptjs'


const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, {
    timestamps: true
  });
UserSchema.index({ email: 1 });

const User = mongoose.model('User', UserSchema);


// left it empty for simplicity, described below
const customizationOptions = {}
const UserTC = composeWithMongoose(User, customizationOptions);
// UserTC.removeField('password')

const JWTTC = TypeComposer.create({
  name: 'JWT',
  fields: {
    token: 'String'
  }
});

const LoginTC = TypeComposer.create({
  name: 'Login',
  fields: {
    email: 'String!',
    password: "String!"
  },
});

//Register
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

//Login
UserTC.addResolver({
  name: 'login',
  type: JWTTC,
  description: "Login User and return JWT",
  args: toInputObjectType(LoginTC),
  resolve: async ({ source, args, context, info }) => {
    const { loginInput } = args
    const { errors, isValid } = validateLogin(req.body);

    // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const { email, password } = loginInput

    // Find user by email
    User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }; // Create JWT Payload

          // Sign Token
          jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => { ({ token: "Bearer " + token }); });
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  }
});


export default UserTC






