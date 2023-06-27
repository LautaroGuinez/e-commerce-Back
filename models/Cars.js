const { Sequelize } = require("sequelize");
const db = require("../config/db");

class Cars extends Sequelize.Model {}

Cars.init(
  {
    date: {
      type: Sequelize.DATE,
    },
  },
  { sequelize: db, modelName: "cars" }
);

module.exports = Cars;
