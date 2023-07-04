const express = require("express");
const routerProduct = express.Router();
const { Op } = require("sequelize");
const { getProduct } = require("../controller/productController");
const Product = require("../models/Product");

routerProduct.get("/:id", getProduct);

routerProduct.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting the products" });
  }
});

routerProduct.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const results = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`,
        },
      },
    });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
});

routerProduct.post("/submit", async (req, res) => {
  try {
    const results = await Product.create(req.body);
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = routerProduct;
