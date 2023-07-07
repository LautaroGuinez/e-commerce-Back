require("dotenv").config();
const express = require("express");
const app = express();
const volleyball = require("volleyball");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = require("./routes");
const db = require("./config/db.js");

app.use(volleyball);
app.use(
  cors({
    origin: process.env.URLFRONT,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

db.sync({ force: false }).then(() => {
  console.log("db conected");
  app.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`)
  );
});
