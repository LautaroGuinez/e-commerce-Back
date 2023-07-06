const express = require("express");
const routerUser = express.Router();

const {
  register,
  login,
  logout,
  persistence,
  getAllUsers,
  deleteUser,
  putUser,
} = require("../controller/userController");

const { validateAuth } = require("../middleware/index.js");

routerUser.get("/", getAllUsers);

routerUser.get("/logout", logout);

routerUser.get("/me", validateAuth, persistence);

routerUser.post("/register", register);

routerUser.post("/login", login);

routerUser.delete("/:id/delete", deleteUser);
=======
routerUser.put("/put", putUser);



module.exports = routerUser;
