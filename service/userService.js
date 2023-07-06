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

exports.getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};
exports.getUserByEmail = async (data) => {
  const { email } = data;
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  return user;
};

exports.deleteUser = async (user) => {
  const { email } = user;
  return await User.destroy({
    where: {
      email: email,
    },
  });
};

exports.editUser = async (email, user) => {
  const editedUser = await User.update(user, {
    where: {
      email: email,
    },
  });
  return editedUser;
};
