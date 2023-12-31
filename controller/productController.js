const Product = require("../models/Product");
const productService = require("../service/productService");

const getProductByID = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productService.getProductByID(id);
    console.log(product);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).json({ message: "Error getting the products" });
  }
};

const getProductByQuery = async (req, res) => {
  try {
    const { query } = req.params;
    const products = await productService.getProductByQuery(query);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).json({ error: "Search failed" });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const name = req.params.name;
    const products = await productService.getProductByCategory(name);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).json({ error: "Search failed" });
  }
};

const submitProduct = async (req, res) => {
  try {
    const product = await productService.postProduct(req.body);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).json({ error: "Search failed" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await productService.deleteProduct(id);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const editedProduct = await productService.editProduct(id, req.body);
    return res.status(200).send(editedProduct);
  } catch (error) {
    return res.status(500).json({ error: "Search failed" });
  }
};

module.exports = {
  getProductByID,
  getAllProducts,
  getProductByQuery,
  submitProduct,
  deleteProduct,
  editProduct,
  getProductByCategory,
};
