const accountService = require('../services/accountService.js');

/**
 * Récupère la liste des comptes
 */
async function getAllAccounts(req, res) {
    try {
        // Récupération des comptes
        const accounts = await accountService.findAllAccounts();

        // Au moins 1 compte -> Succès
        if (accounts.length > 0) {
            const message = {
                succeed: true,
                data: accounts
            }
            res.status(200).json(message);

        // Sinon -> 404 - Aucun compte
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Aucun compte"
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
 * Récupère un compte via son id
 */
async function getAccountById(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupération d'un compte
        const account = await accountService.findAccountById(id);
        
        // Si compte récupéré -> succès
        if (account) {
            const message = {
                succeed: true,
                data: account
            }
            res.status(200).json(message);

        // Sinon -> 404 - Compte introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Compte introuvable"
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
 * Ajoute un nouveau compte
 */
async function createAccount(req, res) {
    try {
        // Crée un compte
        await accountService.createAccount(req.body);

        const message = {
            succeed: true,
            message: "Compte ajouté avec succès"
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
 * Modifie un compte existant
 */
async function updateAccount(req, res) {
    try {
        const id = parseInt(req.params.id);
        
        // Récupère le compte
        const account = await accountService.findAccountById(id);

        // Si compte récupéré -> succès
        if (account) {
            await accountService.editAccount(id, req.body);
            const message = {
                succeed: true,
                message: "Compte modifié avec succès"
            }
            res.status(201).json(message);

        // Sinon -> 404 - Compte introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Compte introuvable"
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
 * Supprime un compte existant
 */
async function deleteAccount(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupère le compte
        const account = await accountService.findAccountById(id);

        // Si compte récupéré -> succès
        if (account) {
            await accountService.removeAccount(id);
            const message = {
                succeed: true,
                message: "Compte supprimé avec succès"
            }
            res.status(201).json(message);
        
        // Sinon -> 404 - Compte introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Compte introuvable"
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
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount
};
