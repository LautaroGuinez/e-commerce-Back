//routes
const express = require("express");
const router = express.Router();
const users = require("./routerUser");

router.use("/users", users);

module.exports = router;
