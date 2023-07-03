const express = require("express");
const routerUser = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/Users");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middleware/index.js");

routerUser.post("/register", (req, res) => {
  const { name, lastname, email, password } = req.body;
  User.create({ name, lastname, email, password }).then((user) =>
    res.status(201).send(user)
  );
});

routerUser.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
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

    const token = generateToken(payload);
    res.cookie("token", token);
    res.json({ message: "login successful", payload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});
routerUser.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

routerUser.get("/me", validateAuth, (req, res) => res.send(req.user));

module.exports = routerUser;
