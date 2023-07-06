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
    const { id } = req.params; // Obtener el ID del usuario de los parámetros de la URL
    await userService.deleteUser(id); // Pasar el ID a la función deleteUser del servicio
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const editUser = async (req, res) => {
  try {
    const { email } = req.body;
    const editedUser = await userService.editUser(email, req.body);
    return res.status(200).send(editedUser);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};
const persistence = (req, res) => {
  try {
    return res.send(req.user);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};
<<<<<<< HEAD
=======
const editUser = async (req, res) => {
  try {
    const { email } = req.body;
    const editedUser = await userService.editUser(email, req.body);
    return res.status(200).send(editUser);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const sendMail = async (req,res) =>{
  try{
   const send = await userService.getUserByEmail(req.body);
   await userService.sendMail(send)
   return res.status(200);
  }
  catch (error) {
    return res.status(500).json({error: "Error sending email"})
  }
}


>>>>>>> 0136714af80f6d3aa099c1e348e005b20ea36a62
module.exports = {
  register,
  login,
  logout,
  persistence,
  getAllUsers,
  deleteUser,

  sendMail,

  editUser,

};
