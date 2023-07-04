const express = require("express");
const routerUser = express.Router();

const {
  register,
  login,
  logout,
  persistence,
  deleteUser,
} = require("../controller/userController");

const { validateAuth } = require("../middleware/index.js");
const router = require(".");
const id = require("volleyball/lib/id");

routerUser.post("/register", register);

routerUser.post("/login", login);

routerUser.get("/logout", logout);

routerUser.get("/me", validateAuth, persistence);

routerUser.delete("/me/:id", deleteUser);
module.exports = routerUser;
