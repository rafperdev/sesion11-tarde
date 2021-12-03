const express = require("express");
const cors = require("cors");
const { productos } = require("./datos");
const app = express();

app.use(cors()) //Middleware cors
app.use(express.json()); //Middleware para convertir a JSON
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

/**
 * API Rest Guardar Producto
 * Descripción: Guarda los productos nuevos en la base datos
 * Ruta: /producto/guardar
 * Método: POST
 * Datos de entrada: {nombre:"mango",precio:200,stock:30}
 * Respuesta: {estado: "ok", msg: "Producto Guardado!"}
 */
app.post("/producto/guardar", (req, res) => {
    // Capturar los datos que vienen del cliente
    const { nombre, precio, stock } = req.body;
    // Crear un JSON con los datos capturados
    const prod = { title: nombre, price: precio, stock };
    // Guardarlos en el array de Productos
    productos.push(prod);
    console.log(productos);
    // Responder al cliente
    res.send({ estado: "ok", msg: "Producto Guardado!" });
})

/**
 * API Rest Editar Producto
 * Descripción: Edita un producto de la base datos
 * Ruta: /producto/editar
 * Método: POST
 * Datos de entrada: {nombre:"mango",precio:200,stock:30}
 * Respuesta: {estado: "ok", msg: "Producto Editado!"}
 */
app.post("/producto/editar", (req, res) => {
    // Capturar los datos que vienen del cliente
    const { nombre, precio, stock } = req.body;
    // Crear un JSON con los datos capturados
    const prod = { title: nombre, price: precio, stock };
    // Edita el producto en el array
    let i = 0;
    for (const p of productos) {
        if (p.title.toLowerCase() == nombre.toLowerCase()) {
            productos[i] = prod;
            break;
        }
        i++;
    }
    // Responder al cliente
    res.send({ estado: "ok", msg: "Producto Editado!" });
})

/**
 * API Rest Eliminar Producto
 * Descripción: Elimina un producto de la base datos
 * Ruta: /producto/eliminar
 * Método: POST
 * Datos de entrada: {nombre:"mango"}
 * Respuesta: {estado: "ok", msg: "Producto Eliminado!"}
 */
app.post("/producto/eliminar", (req, res) => {
    // Capturar los datos que vienen del cliente
    const { nombre } = req.body;
    // Edita el producto en el array
    let i = 0;
    for (const p of productos) {
        if (p.title.toLowerCase() == nombre.toLowerCase()) {
            productos.splice(i,1);
            break;
        }
        i++;
    }
    // Responder al cliente
    res.send({ estado: "ok", msg: "Producto Eliminado!" });
})

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080...")
})