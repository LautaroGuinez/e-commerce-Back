const User = require("../models/Users");
const { generateToken } = require("../config/tokens");
const userService = require("../service/userService");

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    const payload = await userService.login(req.body);
    const token = generateToken(payload);
    res.cookie("token", token);
    return res.json({ message: "login successful", payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Logout failed" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Logout failed" });
  }
};

const persistence = (req, res) => {
  try {
    return res.send(req.user);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { register, login, logout, persistence };
