const { Router } = require("express");
const { userAuthGuard } = require("../guard/userAuthGuard");
const { productosModel } = require("../modelos/productosModel");
const ventasRutas = Router();
const { ventasModel } = require("../modelos/ventasModel");

ventasRutas.post("/guardar", userAuthGuard, function (req, res) {
    const data = req.body;
    const ventas = new ventasModel(data);
    ventas.save(function (error) {
        if (error) {
            console.log(error)
            return res.status(500).json({ estado: "error", msg: "ERROR: Al guardar Venta" });
        }
        res.status(200).send({ estado: "ok", msg: "Venta Guardada" })
    })
});

ventasRutas.get("/listar", userAuthGuard, function (req, res) {
    ventasModel.find({}, function (err, ventas) {
        productosModel.populate(ventas, { path: "producto" }, function (err, ventas) {
            console.log(err)
            res.status(200).send({ estado: "ok", msg: "Ventas", data: ventas })
        })
    })
})

exports.ventasRutas = ventasRutas;