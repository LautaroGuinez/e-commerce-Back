const User = require("../models/Users");
const userService = require("../service/userService");

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    return res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { register };
