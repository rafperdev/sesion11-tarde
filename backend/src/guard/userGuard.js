const { verify } = require("jsonwebtoken");

function userGuard(req, res, next) {
    // Captura la cabecera Authorization
    const authorization = req.headers.authorization;
    if (!authorization) {
        next(res.status(403).json({ estado: "error", msg:"NO Autorizado" }));
    }
    // Pregunta si tiene esa cabecera
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET_KEY);
        if (payload.rol !== "admin"){
            next(res.status(403).json({ estado: "error", msg:"NO Autorizado" }));
        }
    } catch (error) {

    }
    next();
}

exports.userGuard = userGuard;