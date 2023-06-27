const express = require("express");
const routerProduct = express.Router();

const Product = require("../models/Product");


// Ruta para obtener todos los productos
routerProduct.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
});

module.exports = routerProduct;