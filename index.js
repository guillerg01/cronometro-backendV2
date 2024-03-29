const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./db/config");
const cors = require("cors");

// crear servidor
const app = express();

//cors
app.use(cors());

//directorio publico
app.use(express.static("public"));

//bd
dbConnection();

//lectura y parseo del boddy
app.use(express.json());

//RUTAS
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/tiempos", require("./routes/tiempo"));
app.use("/api/trabajadores", require("./routes/trabajadores"));
app.use("/api/empleados", require("./routes/empleados"));
app.use("/api/paquetes", require("./routes/paquete"));

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log("server en 4000");
});
