// configuracion jwt
const envs = require("./envs");
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, envs.SECRET, { expiresIn: "2d" });
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, envs.SECRET);
};

module.exports = { generateToken, validateToken };
