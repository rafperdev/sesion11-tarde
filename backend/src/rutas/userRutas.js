const { Router } = require("express");
const userRutas = Router();
const { userModel } = require("../modelos/userModel")
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { userGuard } = require("../guard/userGuard");

userRutas.post("/login", async function (req, res) {
    // Captura el usuario / password
    const { usuario, password } = req.body;
    // Buscar en BD el usuario
    const user = await userModel.findOne({ usuario });
    // Preguntar si existe el usuario
    if (!user) {
        return res.status(401).send({ estado: "error", msg: "Credenciales NO válidas" });
    }
    // Comparar el password bcrypt
    const passOK = await compare(password, user.password);
    if (passOK === true) {
        const token = sign(
            {
                usuario: user.usuario,
                rol: user.rol
            },
            process.env.JWT_SECRET_KEY
        )
        return res.status(200).send({ estado: "ok", msg: "Logueado :)", token });
    }
    return res.status(401).send({ estado: "error", msg: "Credenciales NO válidas" });
});

userRutas.post("/save", userGuard, function (req, res) {
    // Captura los datos
    const data = req.body;
    // Instancia el modelo y pobla con los datos
    const user = new userModel(data);
    // Guarda en BD
    user.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "error", msg: "ERROR: Usuario NO guardado" });
        }
        return res.status(200).send({ estado: "ok", msg: "Usuario guardado !" });
    });
    // Responde OK/Error
})

exports.userRutas = userRutas;