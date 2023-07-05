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
    description: {
      type: Sequelize.TEXT,
    },
    imgUrl: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
    },
    stock: {
      type: Sequelize.INTEGER,
    },
  },
  { sequelize: db, modelName: "products" }
);



module.exports = Product;
