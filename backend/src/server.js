const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Productos = require("./modelos/productosModel");
const { productoRutas } = require("./rutas/productosRutas");
const { userRutas } = require("./rutas/userRutas");
const { ventasRutas } = require("./rutas/ventasRutas");
const app = express();
require("dotenv").config();

app.use(cors()) //Middleware cors
app.use(express.json()); //Middleware para convertir a JSON

app.use("/producto", productoRutas);
app.use("/user", userRutas);
app.use("/ventas", ventasRutas);
//Conecta a la BD
mongoose.connect(process.env.URL_DATABASE)
    .then(res => console.log("Conectado a BD"))
    .catch(error => console.log(error));

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080...")
})