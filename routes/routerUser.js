const express = require("express");
const routerUser = express.Router();

const User = require("../models/Users");
const {
  register,
  login,
  logout,
  persistence,
} = require("../controller/userController");

const { validateAuth } = require("../middleware/index.js");

routerUser.post("/register", register);

routerUser.post("/login", login);

routerUser.get("/logout", logout);

routerUser.get("/me", validateAuth, persistence);

module.exports = routerUser;
