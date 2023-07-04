const User = require("../models/Users");

exports.register = async (user) => {
  const { email } = user;
  const userMatch = await User.findOne({
    where: {
      email,
    },
  });
  if (userMatch) throw new Error("User allready exist");

  return await User.create(user);
};
