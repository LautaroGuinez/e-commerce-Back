// Configuración del server
const db = require("./config/db");
const express = require("express");
const app = express();
const router = require("./routes");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: "http://localhost:3000/",
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

db.sync({ force: false }).then(() => {
  console.log("db conectada");
  app.listen(3001, () => console.log("Servidor escuchando en el puerto 3001"));
});
