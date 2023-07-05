const express = require("express");
const routerProduct = express.Router();
const { Op } = require("sequelize");
const {
  getProductByID,
  getAllProducts,
  getProductByQuery,
  submitProduct,
  deleteProduct,
  editProduct,
} = require("../controller/productController");

routerProduct.get("/:id", getProductByID);

routerProduct.get("/", getAllProducts);

routerProduct.get("/search/:query", getProductByQuery);

routerProduct.post("/submit", submitProduct);

routerProduct.delete("/delete/:id", deleteProduct);

routerProduct.put("/:id/edit", editProduct);

module.exports = routerProduct;
