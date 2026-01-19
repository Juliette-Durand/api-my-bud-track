const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

/**
 * Middleware de mise à jour du token
 */
async function refreshTokenMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const user = await userService.findUserById(decodedToken.sub);
        if (token !== user.refreshToken) throw "Token invalide";

        req.refreshPayload = { userId: decodedToken.sub };

        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};

module.exports = refreshTokenMiddleware;
