const Product = require("../models/Product");
const { Op } = require("sequelize");

exports.getProductByID = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return new Error("The product does not exist");
  return product;
};

exports.getAllProducts = async () => {
  const products = await Product.findAll();
  return products;
};

exports.getProductByQuery = async (query) => {
  const results = await Product.findAll({
    where: {
      name: {
        [Op.like]: `%${query}%`,
      },
    },
  });

  return results;
};
exports.postProduct = async (product) => {
  const results = await Product.create(product);
  return results;
};

exports.deleteProduct = async (id) => {
  return await Product.destroy({
    where: {
      id: id,
    },
  });
};

exports.editProduct = async (productID, product) => {
  const editedProduct = await Product.update(product, {
    where: {
      id: productID,
    },
  });

  exports.getProductByCategory = async (category) => {
    const products = await Product.findAll({
      where: {
        category: category,
      },
    });

    return products;
  };

  return editedProduct;
};
