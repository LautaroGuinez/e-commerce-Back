// models product
const db = require("../config/db");
const Sequelize = require("sequelize");

class Product extends Sequelize.Model {}

Product.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true, // Validación opcional para asegurarse de que la cadena sea una URL válida
      },
    },
    stock: {
      type: Sequelize.INTEGER,
    },
  },
  { sequelize: db, modelName: "product" }
);

module.exports = Product;
