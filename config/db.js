// configuracion de db
const Sequelize = require("sequelize");
import { DB_HOST } from "./envs";

const db = new Sequelize(DB_HOST, null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
