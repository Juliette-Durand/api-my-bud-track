const typeAccountService = require('../services/typeAccountService.js');

/**
 * Récupère la liste des types de comptes
 */
async function getAllTypes(req, res) {
    try {
        // Récupération des types de comptes
        const typesAccount = await typeAccountService.findAllTypes();

        // Au moins 1 type de compte -> Succès
        if (typesAccount.length > 0) {
            const message = {
                succeed: true,
                data: typesAccount
            }
            res.status(200).json(message);

        // Sinon -> 404 - Aucun type de compte
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Aucun type de compte"
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
 * Récupère un type de compte via son id
 */
async function getTypeById(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupération d'un type de compte
        const typeAccount = await typeAccountService.findTypeById(id);
        
        // Si type de compte récupéré -> succès
        if (typeAccount) {
            const message = {
                succeed: true,
                data: typeAccount
            }
            res.status(200).json(message);

        // Sinon -> 404 - Type de compte introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Type de compte introuvable"
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
 * Ajoute un nouveau type de compte
 */
async function createType(req, res) {
    try {
        // Crée un type de compte
        await typeAccountService.createType(req.body);

        const message = {
            succeed: true,
            message: "Type de compte ajouté avec succès"
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
 * Modifie un type de compte existant
 */
async function updateType(req, res) {
    try {
        const id = parseInt(req.params.id);
        
        // Récupère l'utilisateur
        const typeAccount = await typeAccountService.findTypeById(id);

        // Si utilisateur récupéré -> succès
        if (typeAccount) {
            await typeAccountService.editType(id, req.body);
            const message = {
                succeed: true,
                message: "Type de compte modifié avec succès"
            }
            res.status(201).json(message);

        // Sinon -> 404 - Type de compte introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Type de compte introuvable"
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
 * Supprime un type de compte existant
 */
async function deleteType(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupère le type de compte
        const typeAccount = await typeAccountService.findTypeById(id);

        // Si type de compte récupéré -> succès
        if (typeAccount) {
            await typeAccountService.removeType(id);
            const message = {
                succeed: true,
                message: "Type de compte supprimé avec succès"
            }
            res.status(201).json(message);
        
        // Sinon -> 404 - Type de compte introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Type de compte introuvable"
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
    getAllTypes,
    getTypeById,
    createType,
    updateType,
    deleteType
};