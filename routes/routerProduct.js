const express = require("express");
const routerProduct = express.Router();
const { Op } = require("sequelize");

const Product = require("../models/Product");
const routerUser = require("./routerUser");

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

//Ruta para obtener productos con nombre espesifico

routerProduct.get("/search/:query", (req, res) => {
  const { query } = req.params;
  Product.findAll({
    where: {
      name: {
        [Op.like]: `%${query}%`,
      },
    },
  })
    .then((results) => {
      // Enviar los resultados al frontend como objeto JSON
      res.status(200).json(results);
    })
    .catch((error) => {
      // Manejar errores
      console.error(error);
      res.status(500).json({ error: "Error en la búsqueda" });
    });
});

routerProduct.post("/submit", (req, res) => {
  Product.create(req.body)
    .then((results) => res.status(200).send(results))
    .catch((error) => {
      // Manejar errores
      console.error(error);
      res.status(500).json({ error: "Error en la búsqueda" });
    });
});

module.exports = routerProduct;
