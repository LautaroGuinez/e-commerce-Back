// server configuration

const express = require("express");
const app = express();
const volleyball = require("volleyball");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = require("./routes");
const db = require("./config/db.js");
const envs = require("./config/envs");

app.use(volleyball);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

db.sync({ force: false }).then(() => {
  console.log("db conected");
  app.listen(envs.PORT, () => console.log("Server listening on port 3001"));
});
