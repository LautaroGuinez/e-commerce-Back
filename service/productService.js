const Product = require("../models/Product");
const { Op } = require("sequelize");

exports.getProducByID = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return new Error("The product does not exist");
  return product;
};
