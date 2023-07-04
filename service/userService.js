const User = require("../models/Users");
const bcrypt = require("bcrypt");

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

exports.login = async (users) => {
  const { email, password } = users;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ error: "Username does not exist" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Incorrect password" });
  }
  const payload = {
    email: user.email,
    name: user.name,
    lastname: user.lastname,
  };
  return payload;
};
exports.deleteUserService = async (id) => {
  User.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.sendStatus(202))
    .catch(next);
};
