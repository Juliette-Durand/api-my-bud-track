require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * Middleware de vérification de token d'authentification
 */
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token manquant"
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({
                message: `Token invalide`
            });
        }

        req.userId = decoded.sub;
        next();
    });
}

module.exports = authMiddleware;