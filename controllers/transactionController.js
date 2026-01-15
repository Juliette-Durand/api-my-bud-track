const transactionService = require('../services/transactionService.js');

/**
 * Récupère la liste des transactions
 */
async function getAllTransactions(req, res) {
    try {
        // Récupération des transactions
        const transactions = await transactionService.findAllTransactions();

        // Au moins 1 transaction -> Succès
        if (transactions.length > 0) {
            const message = {
                succeed: true,
                data: transactions
            }
            res.status(200).json(message);

        // Sinon -> 404 - Aucune transaction
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Aucune transaction"
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
 * Récupère une transaction via son id
 */
async function getTransactionById(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupération d'une transaction
        const transaction = await transactionService.findTransactionById(id);
        
        // Si transaction récupérée -> succès
        if (transaction) {
            const message = {
                succeed: true,
                data: transaction
            }
            res.status(200).json(message);

        // Sinon -> 404 - Transaction introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Transaction introuvable"
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
 * Ajoute une nouvelle transaction
 */
async function createTransaction(req, res) {
    try {
        // Crée une transaction
        await transactionService.createTransaction(req.body);

        const message = {
            succeed: true,
            message: "Transaction ajoutée avec succès"
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
 * Modifie une transaction existante
 */
async function updateTransaction(req, res) {
    try {
        const id = parseInt(req.params.id);
        
        // Récupère la transaction
        const transaction = await transactionService.findTransactionById(id);

        // Si transaction récupérée -> succès
        if (transaction) {
            await transactionService.editTransaction(id, req.body);
            const message = {
                succeed: true,
                message: "Transaction modifiée avec succès"
            }
            res.status(201).json(message);

        // Sinon -> 404 - Transaction introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Transaction introuvable"
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
 * Supprime une transaction existante
 */
async function deleteTransaction(req, res) {
    try {
        const id = parseInt(req.params.id);

        // Récupère la transaction
        const transaction = await transactionService.findTransactionById(id);

        // Si transaction récupérée -> succès
        if (transaction) {
            await transactionService.removeTransaction(id);
            const message = {
                succeed: true,
                message: "Transaction supprimée avec succès"
            }
            res.status(201).json(message);
        
        // Sinon -> 404 - Transaction introuvable
        } else {
            const message = {
                succeed: false,
                error: {
                    code: 404,
                    message: "Transaction introuvable"
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
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
};
