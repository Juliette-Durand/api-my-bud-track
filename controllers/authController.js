const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userService = require("../services/userService");

/**
 * Inscrit un nouveau utilisateur
 */

async function signUp(req, res) {
    try {
        const { lastname, firstname, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await userService.createUser({
            lastname: lastname,
            firstname: firstname,
            email: email,
            password: hashedPassword
        });

        const message = {
            succeed: true,
            message: "Utilisateur ajouté avec succès"
        }
        res.status(201).json(message);

    } catch (error) {
        const message = {
            succeed: false,
            error: {
                code: 400,
                message: error.message
            }
        }
        res.status(message.error.code).json(message);
    }
}


/**
 * Authentifie un utilisateur
 */
async function signIn(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userService.findUserByEmail(email);

        if (!user) {
            const message = {
                succeed: false,
                error: {
                    code: 401,
                    message: "Identifiants ou mot de passe incorrect"
                }
            }
            res.status(message.error.code).json(message);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const message = {
                succeed: false,
                error: {
                    code: 401,
                    message: "Identifiants ou mot de passe incorrect"
                }
            }
            res.status(message.error.code).json(message);
        }

        // Access token
        const accessToken = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );

        // Refresh token
        const refreshToken = jwt.sign(
            { sub: user.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        // Enregistrement du refresh token en base de données
        await userService.saveRefreshToken(refreshToken, user.id);

        const message = {
            succeed: true,
            data: { accessToken, refreshToken }
        }
        res.status(200).json(message);

    } catch (error) {
        const message = {
            succeed: false,
            error: {
                code: 400,
                message: error.message
            }
        }
        res.status(message.error.code).json(message);
    }
}

/**
 * Récupère le refresh token
 */
async function getRefreshToken(req, res) {
    try {
        const { userId } = req.refreshPayload;

        // Access token
        const accessToken = jwt.sign(
            { sub: userId },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );

        // Refresh token
        const refreshToken = jwt.sign(
            { sub: userId },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        await userService.saveRefreshToken(refreshToken, userId);

        const message = {
            succeed: true,
            data: { accessToken, refreshToken }
        }
        res.status(200).json(message);

    } catch (error) {
        const message = {
            succeed: false,
            error: {
                code: 400,
                message: error.message
            }
        }
        res.status(message.error.code).json(message);
    }
};

/**
 * Déconnecte un utilisateur (invalide le refresh token en BDD)
 */
async function logout(req, res) {
    try {
        const userId = req.userId;

        await userService.saveRefreshToken(null, userId);

        const message = {
            succeed: true,
            message: "Déconnexion réussie"
        }
        res.status(200).json(message);

    } catch (error) {
        const message = {
            succeed: false,
            error: {
                code: 400,
                message: error.message
            }
        }
        res.status(message.error.code).json(message);
    }
}

module.exports = {
    signUp,
    signIn,
    getRefreshToken,
    logout
};