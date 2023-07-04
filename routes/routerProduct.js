const express = require("express");
const routerProduct = express.Router();
const { Op } = require("sequelize");
const {
  getProduct,
  getAllProducts,
  getProductByQuery,
  submitProduct,
} = require("../controller/productController");
const Product = require("../models/Product");

routerProduct.get("/:id", getProduct);

routerProduct.get("/", getAllProducts);

routerProduct.get("/search/:query", getProductByQuery);

routerProduct.post("/submit", submitProduct);

module.exports = routerProduct;
