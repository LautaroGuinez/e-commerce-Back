const express = require("express");
const routerUser = express.Router();
const { generateToken } = require("../config/tokens");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
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
    // Busca el usuario en la base de datos
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    const payload = {
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    };
    // Si el usuario y la contraseña son correctos, se envía una respuesta exitosa
    const token = generateToken(payload);
    res.cookie("token", token);
    res.json({ message: "Inicio de sesión exitoso", payload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

routerUser.get("/me", validateAuth, (req, res) => res.send(req.user));
routerUser.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

module.exports = routerUser;
