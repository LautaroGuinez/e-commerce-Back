const express = require("express");
const routerUser = express.Router();

const {
  register,
  login,
  logout,
  persistence,
  getAllUsers,
  deleteUser,
} = require("../controller/userController");

const { validateAuth } = require("../middleware/index.js");
const router = require(".");
const id = require("volleyball/lib/id");

routerUser.get("/", getAllUsers);

routerUser.get("/logout", logout);

routerUser.get("/me", validateAuth, persistence);

routerUser.post("/register", register);

routerUser.post("/login", login);

routerUser.delete("/delete", deleteUser);

module.exports = routerUser;
