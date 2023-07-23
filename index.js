const express = require("express");
require("dotenv").config();
const {dbConnection} = require('./db/config')

// crear servidor
const app = express();

//directorio publico
app.use(express.static("public"));


//bd
dbConnection();

//lectura y parseo del boddy
app.use(express.json())

//directorio de auth
app.use("/api/auth", require("./routes/auth"));

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log("server en 4000");
});