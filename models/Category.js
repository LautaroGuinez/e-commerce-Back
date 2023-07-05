const { Sequelize } = require("sequelize");
const db = require("../config/db")

class Category extends Sequelize.Model {}

Category.init(
  {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
  },
  { sequelize: db, modelName: "categories" }
);

module.exports = Category;