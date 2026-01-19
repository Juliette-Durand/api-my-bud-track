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

        res.status(201).json({
            message: "Utilisateur inscrit avec succès"
        });

    } catch (error) {
        res.status(500).json({
            message: `${error}`
        });
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
            return res.status(401).json({
                message: "Identifiants ou mot de passe incorrect"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Identifiants ou mot de passe incorrect"
            });
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

        res.status(200).json({ accessToken, refreshToken });

    } catch (error) {
        res.status(500).json({
            message: `${error}`
        });
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


        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(401).json({ message: "Impossible de renouveler le token", error });
    }
};

/**
 * Déconnecte un utilisateur (invalide le refresh token en BDD)
 */
async function logout(req, res) {
    try {
        const userId = req.userId;

        await userService.saveRefreshToken(null, userId);

        res.status(200).json({
            message: "Déconnexion réussie"
        });
    } catch (error) {
        res.status(500).json({
            message: `${error}`
        });
    }
}

module.exports = {
    signUp,
    signIn,
    getRefreshToken,
    logout
};