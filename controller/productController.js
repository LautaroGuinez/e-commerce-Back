const Product = require("../models/Product");
const productService = require("../service/productService");

const getProduct = async (req, res) => {
  try {
    const product = productService.getProducByID(req.params.id);
    res.sendStatus(200).send(product);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getProduct };
