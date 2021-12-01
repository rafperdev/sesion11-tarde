const express = require("express");
const cors = require("cors");
const { productos } = require("./datos");
const app = express();

app.use(cors())

// API, endpoint, rutas, API Rest
app.get("/", function (req, res) {
    res.send("Bienvenidos a la clase!!");
});

//API Rest: verbo, ruta, endpoint
app.get("/producto/consultar/:name", function (req, res) {
    const name = req.params.name;
    const prod = productos.find(p => p.title.toLowerCase() === name.toLowerCase());
    res.send(prod);
})

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080...")
})