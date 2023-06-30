//routes
const express = require("express");
const router = express.Router();
const users = require("./routerUser");
const products = require("./routerProduct");
router.use("/users", users);
router.use("/products", products);
module.exports = router;
