const mongoose = require('mongoose');

const User = mongoose.model('User');

const getcurrentUser = async ({ session }) => {
  const user = await User.findOne({ email: session.user.email }).select(
    '-password',
  );
  if (user) {
    return user;
  }
};

module.exports = getcurrentUser;
