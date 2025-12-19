const catTransactionService = require('../services/catTransactionService.js');

/**
 * Récupère la liste des catégories de transactions
 */
async function getAllCategories(req, res) {
    try {
        // Récupération des catégories de transactions
        const typesAccount = await catTransactionService.findAllCategories();

        // Au moins 1 catégorie de transaction -> Succès
        if (typesAccount.length > 0) {
            const message = {
                succeed: true,
                data: typesAccount
            }
            res.status(200).json(message);

        // Sinon -> 404 - Aucune catégorie de transaction
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Aucune catégorie de transaction"
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
 * Récupère un catégorie de transaction via son id
 */
async function getCategoryById(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupération d'un catégorie de transaction
        const typeAccount = await catTransactionService.findCategoryById(id);
        
        // Si catégorie de transaction récupérée -> succès
        if (typeAccount) {
            const message = {
                succeed: true,
                data: typeAccount
            }
            res.status(200).json(message);

        // Sinon -> 404 - Catégorie de transaction introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Catégorie de transaction introuvable"
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
 * Ajoute un nouveau catégorie de transaction
 */
async function createCategory(req, res) {
    try {
        // Crée un catégorie de transaction
        await catTransactionService.createCategory(req.body);

        const message = {
            succeed: true,
            message: "Catégorie de transaction ajoutée avec succès"
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
 * Modifie un catégorie de transaction existante
 */
async function updateCategory(req, res) {
    try {
        const id = parseInt(req.params.id);
        
        // Récupère l'utilisateur
        const typeAccount = await catTransactionService.findCategoryById(id);

        // Si utilisateur récupéré -> succès
        if (typeAccount) {
            await catTransactionService.editCategory(id, req.body);
            const message = {
                succeed: true,
                message: "Catégorie de transaction modifiée avec succès"
            }
            res.status(201).json(message);

        // Sinon -> 404 - Catégorie de transaction introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Catégorie de transaction introuvable"
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
 * Supprime un catégorie de transaction existante
 */
async function deleteCategory(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupère la catégorie de transaction
        const typeAccount = await catTransactionService.findCategoryById(id);

        // Si catégorie de transaction récupérée -> succès
        if (typeAccount) {
            await catTransactionService.removeCategory(id);
            const message = {
                succeed: true,
                message: "Catégorie de transaction supprimée avec succès"
            }
            res.status(201).json(message);
        
        // Sinon -> 404 - catégorie de transaction introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Catégorie de transaction introuvable"
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
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};