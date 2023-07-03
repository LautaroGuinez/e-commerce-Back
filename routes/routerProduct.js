const express = require("express");
const routerProduct = express.Router();
const { Op } = require("sequelize");

const Product = require("../models/Product");

routerProduct.get("/:id", (req, res) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "The product does not exist" });
      }
      res.send(product);
    })
    .catch(() => res.status(500).json({ error: "Server Error" }));
});

routerProduct.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting the products" });
  }
});

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
      // Send the results to the frontend as a JSON object
      res.status(200).json(results);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: "Search failed" });
    });
});

routerProduct.post("/submit", (req, res) => {
  Product.create(req.body)
    .then((results) => res.status(200).send(results))
    .catch((error) => {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: "Search failed" });
    });
});

module.exports = routerProduct;
