const { Sequelize } = require("sequelize");
const db = require("../config/db");

class ProductCategory extends Sequelize.Model {}

ProductCategory.init(
  {
    productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },  
   },

  { sequelize: db, modelName: "productCategories" }
);

module.exports = ProductCategory;

