const User = require("../models/Users");
const { generateToken } = require("../config/tokens");
const userService = require("../service/userService");

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send("User allready exist");
  }
};

const login = async (req, res) => {
  try {
    const payload = await userService.login(req.body);
    const token = generateToken(payload);
    res.cookie("token", token);
    return res.json({ message: "login successful", payload });
  } catch (error) {
    return res.status(500).json({ error: "Login failed" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: "Logout failed" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body);
    await userService.deleteUser(user);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const persistence = (req, res) => {
  try {
    return res.send(req.user);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  persistence,
  getAllUsers,
  deleteUser,
};
