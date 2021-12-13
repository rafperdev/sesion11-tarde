const { Router } = require("express");
const productoRutas = Router();
const { productosModel } = require("../modelos/productosModel");

//API Rest: verbo, ruta, endpoint
productoRutas.post("/consultar", function (req, res) {
    const { nombre } = req.body // {nombre:"mango",precio:200,stock:30}
    productosModel.findOne({ nombre }, function (error, prod) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al buscar Producto" })
        } else {
            if (prod !== null) {
                res.send({ estado: "ok", msg: "Producto Encontrado", data: prod });
            } else {
                res.send({ estado: "error", msg: "Producto NO Encontrado" });
            }
        }
    })
})

productoRutas.post("/listar", function (req, res) {
    productosModel.find({}, function (error, prod) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al buscar Producto" })
        } else {
            if (prod !== null) {
                res.send({ estado: "ok", msg: "Producto Encontrado", data: prod });
            } else {
                res.send({ estado: "error", msg: "Producto NO Encontrado" });
            }
        }
    })
})

/**
 * API Rest Guardar Producto
 * Descripción: Guarda los productos nuevos en la base datos
 * Ruta: /guardar
 * Método: POST
 * Datos de entrada: {nombre:"mango",precio:200,stock:30}
 * Respuesta: {estado: "ok", msg: "Producto Guardado!"}
 */
productoRutas.post("/guardar", function (req, res) {
    const data = req.body;
    const prod = new productosModel(data);
    prod.save(function (error) {
        if (error) {
            res.send({ estado: "error", msg: "ERROR: Producto NO Guardado :(" });
            return false;
        }
        res.send({ estado: "ok", msg: "Producto Guardado!" });
    })
});

/**
 * API Rest Editar Producto
 * Descripción: Edita un producto de la base datos
 * Ruta: /editar
 * Método: POST
 * Datos de entrada: {nombre:"mango",precio:200,stock:30}
 * Respuesta: {estado: "ok", msg: "Producto Editado!"}
 */
productoRutas.post("/editar", (req, res) => {
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
productoRutas.post("/eliminar", (req, res) => {
    // Capturar los datos que vienen del cliente
    const { nombre } = req.body;
    // Edita el producto en el array
    let i = 0;
    for (const p of productos) {
        if (p.title.toLowerCase() == nombre.toLowerCase()) {
            productos.splice(i, 1);
            break;
        }
        i++;
    }
    // Responder al cliente
    res.send({ estado: "ok", msg: "Producto Eliminado!" });
})

exports.productoRutas = productoRutas;