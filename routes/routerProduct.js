const express = require("express");
const routerProduct = express.Router();
const Product = require("../models/Product");

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

module.exports = routerProduct;
