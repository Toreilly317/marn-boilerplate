import { UserInputError } from "apollo-server"
import bcrypt from "bcryptjs"

const { JWT_SECRET } = process.env


const checkAuth = async (token) => {
  const email = req.body.email;
  const password = req.body.password;

  //get user
  const user = await User.findOne({ email })

  //return if user not found
  if (!user) {
    throw new UserInputError('User not Found', {
      invalidArgs: Object.keys(args),
    });
    errors.email = 'User not found';
    return res.status(404).json(errors);
  }
  // else Check Password
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // User Matched
    const payload = { id: user.id, firstName: user.firstName }; // Create JWT Payload

    // Sign Token
    return jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => ({ token: 'Bearer ' + token })
    );


  });
