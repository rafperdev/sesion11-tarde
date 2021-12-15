const { verify } = require("jsonwebtoken");

function userAuthGuard(req, res, next) {
    // Captura la cabecera Authorization
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(403).json({ estado: "error", msg: "NO Autorizado1" });
    }
    // Pregunta si tiene esa cabecera
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET_KEY);
        if (!payload.usuario) {
            return res.status(403).json({ estado: "error", msg: "NO Autorizado2" });
        }
    } catch (error) {
        return res.status(403).json({ estado: "error", msg: "NO Autorizado3" });
    }
    next();
}

exports.userAuthGuard = userAuthGuard;