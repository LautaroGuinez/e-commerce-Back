const express = require("express");
const router = express.Router();
const users = require("./routerUser");
const products = require("./routerProduct");
const cars = require("./routerCars")
const category = require("./routerCategory")

router.use("/users", users);
router.use("/products", products);
router.use("/cars", cars)
router.use("/category", category);


module.exports = router;
