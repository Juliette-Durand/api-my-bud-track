const userService = require('../services/userService.js');

/**
 * Récupère la liste des utilisateurs
 */
async function getAllUsers(req, res) {
    try {
        // Récupération des utilisateurs
        const users = await userService.findAllUsers();

        // Au moins 1 utilisateur -> Succès
        if (users.length > 0) {
            const message = {
                succeed: true,
                data: users
            }
            res.status(200).json(message);

        // Sinon -> 404 - Aucun utilisateur
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Aucun utilisateur"
                }
            }
            res.status(message.error.code).json(message);
        }

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
 * Récupère un utlisateur via son id
 */
async function getUserById(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupération d'un utilisateur
        const role = await userService.findUserById(id);
        
        // Si utilisateur récupéré -> succès
        if (role) {
            const message = {
                succeed: true,
                data: role
            }
            res.status(200).json(message);

        // Sinon -> 404 - Utilisateur introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Utilisateur introuvable"
                }
            }
            res.status(message.error.code).json(message);
        }
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
 * Ajoute un nouveau utilisateur
 */
async function createUser(req, res) {
    try {
        // Crée un utilisateur
        await userService.createUser(req.body);

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
 * Modifie les informations non sensibles d'un utilisateur existant
 */
async function updateUserProfile(req, res) {
    try {
        const id = parseInt(req.params.id);
        
        // Récupère l'utilisateur
        const user = await userService.findUserById(id);

        // Si utilisateur récupéré -> succès
        if (user) {
            await userService.editUserProfile(id, req.body);
            const message = {
                succeed: true,
                message: "Utilisateur modifié avec succès"
            }
            res.status(201).json(message);

        // Sinon -> 404 - Utilisateur introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Utilisateur introuvable"
                }
            }
            res.status(message.error.code).json(message);
        }
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
 * Modifie l'email d'un utilisateur existant
 */
async function updateUserEmail(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupère l'utilisateur
        const user = await userService.findUserById(id);

        // Si utilisateur récupéré -> succès
        if (user) {
            await userService.editUserEmail(id, req.body);
            const message = {
                succeed: true,
                message: "Email modifié avec succès"
            }
            res.status(201).json(message);

        // Sinon -> 404 - Utilisateur introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Utilisateur introuvable"
                }
            }
            res.status(message.error.code).json(message);
        }
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
 * Modifie le rôle d'un utilisateur existant
 */
async function updateUserRole(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupère l'utilisateur
        const user = await userService.findUserById(id);

        // Si utilisateur récupéré -> succès
        if (user) {
            await userService.editUserRole(id, req.body);
            const message = {
                succeed: true,
                message: "Rôle de l'utilisateur modifié avec succès"
            }
            res.status(201).json(message);

        // Sinon -> 404 - Utilisateur introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Utilisateur introuvable"
                }
            }
            res.status(message.error.code).json(message);
        }
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
 * Modifie le mot de passe d'un utilisateur existant
 */
async function updateUserPassword(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupère l'utilisateur
        const user = await userService.findUserById(id);

        // Si utilisateur récupéré -> succès
        if (user) {
            await userService.editUserPassword(id, req.body);
            const message = {
                succeed: true,
                message: "Mot de passe modifié avec succès"
            }
            res.status(201).json(message);
        
        // Sinon -> 404 - Utilisateur introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Utilisateur introuvable"
                }
            }
            res.status(message.error.code).json(message);
        }
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
 * Supprime un rôle existant
 */
async function deleteUser(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupère l'utilisateur
        const user = await userService.findUserById(id);

        // Si utilisateur récupéré -> succès
        if (user) {
            await userService.removeUser(id);
            const message = {
                succeed: true,
                message: "Utilisateur supprimé avec succès"
            }
            res.status(201).json(message);
        
        // Sinon -> 404 - Utilisateur introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Utilisateur introuvable"
                }
            }
            res.status(message.error.code).json(message);
        }
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
    getAllUsers,
    getUserById,
    createUser,
    updateUserProfile,
    updateUserEmail,
    updateUserRole,
    updateUserPassword,
    deleteUser
};