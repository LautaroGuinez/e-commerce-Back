const User = require("../models/Users");
const bcrypt = require("bcrypt");
const emailConfig = require("../config/emailConfig")

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
    admin: user.admin,
    super_admin: user.admin,
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

exports.deleteUser = async (id) => {
  return await User.destroy({
    where: {
      id: id,
    },
  });
};


exports.sendMail = async (mail) =>{
  const {email} = mail;
   const user = await User.findOne({
    where:{
      email: email
    }
  })
  return emailConfig(user)
}

exports.editUser = async (email, user) => {
  const editedUser = await User.update(user, {
    where: {
      email: email,
    },
  });
  return editedUser;
};

