const express = require("express");
const routerProduct = express.Router();

const Product = require("../models/Product");

// Ruta para obtener un producto
routerProduct.get("/:id", (req, res) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "El producto  no existe" });
      }
      res.send(product);
    })
    .catch((error) => res.status(500).json({ error: "Error en el servidor" }));
});

// Ruta para obtener todos los productos
routerProduct.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
});

module.exports = routerProduct;
