const Product = require("../models/Product");
const productService = require("../service/productService");

const getProduct = async (req, res) => {
  try {
    const product = productService.getProducByID(req.params.id);
    return res.sendStatus(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return res.sendStatus(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error getting the products" });
  }
};

const getProductByQuery = async (req, res) => {
  try {
    const { query } = req.params;
    const products = await productService.getProductByQuery(query);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Search failed" });
  }
};

const submitProduct = async (req, res) => {
  try {
    const product = await productService.postProduct(req.body);
    return res.sendStatus(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Search failed" });
  }
};
module.exports = {
  getProduct,
  getAllProducts,
  getProductByQuery,
  submitProduct,
};
