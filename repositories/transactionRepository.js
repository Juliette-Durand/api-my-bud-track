const prisma = require('../config/prisma');

/**
 * Récupération de toutes les transactions
 * @returns {Array} tableau des transactions
 */
async function getAllTransactions() {

    const transactions = await prisma.transaction.findMany({
        include: {
            category: {
                select: {
                    id: true,
                    label: true
                }
            },
            owner: {
                select: {
                    id: true,
                    lastname: true,
                    firstname: true
                }
            },
            srcAccount: {
                select: {
                    id: true,
                    label: true
                }
            },
            destAccount: {
                select: {
                    id: true,
                    label: true
                }
            }
        }
    });
    
    return transactions;
}

/**
 * Récupération d'une transaction
 * @param {Number} id identifiant de la transaction
 * @returns {Object} tableau de la transaction correspondant à l'id
 */
async function getTransactionById(id) {

    const transaction = await prisma.transaction.findUnique({
        where: {
            id: id
        },
        include: {
            category: {
                select: {
                    id: true,
                    label: true
                }
            },
            owner: {
                select: {
                    id: true,
                    lastname: true,
                    firstname: true
                }
            },
            srcAccount: {
                select: {
                    id: true,
                    label: true
                }
            },
            destAccount: {
                select: {
                    id: true,
                    label: true
                }
            }
        }
    });
    
    return transaction;
}

/**
 * Ajout d'une transaction en base de données
 * @param {Object} transaction objet contenant les infos de la transaction
 * @returns {Object} contenant les infos de la transaction insérée
 */
async function addTransaction(transaction) {
    
    const { label, date, amount, type, categoryId, ownerId, srcAccountId, destAccountId } = transaction;
    const dateTrans = new Date(date);

    const result = await prisma.transaction.create({
        data: {
            label: label,
            date: dateTrans,
            amount: amount,
            type: type,
            category: {
                connect: { id: categoryId }
            },
            owner: {
                connect: { id: ownerId }
            },
            srcAccount: {
                connect: { id: srcAccountId }
            },
            destAccount: {
                connect: { id: destAccountId }
            }
        }
    });

    return result;
}

/**
 * Modifier les informations d'une transaction via son id
 * @param {Number} id identifiant de la transaction
 * @param {Object} transaction objet contenant les nouvelles infos de la transaction
 * @returns {Object} contenant les infos de la transaction modifiée
 */
async function updateTransaction(id, transaction) {
    
    const { label, date, amount, type, categoryId, ownerId, srcAccountId, destAccountId } = transaction;
    const dateTrans = new Date(date);

    const result = await prisma.transaction.update({
        where: {
            id: id
        },
        data: {
            label: label,
            date: dateTrans,
            amount: amount,
            type: type,
            category: {
                connect: { id: categoryId }
            },
            owner: {
                connect: { id: ownerId }
            },
            srcAccount: {
                connect: { id: srcAccountId }
            },
            destAccount: {
                connect: { id: destAccountId }
            }
        }
    });

    return result;
}

/**
 * Supprimer une transaction via son id
 * @param {Number} id identifiant de la transaction
 * @returns {Object} contenant les infos de la transaction supprimée
 */
async function deleteTransaction(id) {

    const result = await prisma.transaction.delete({
        where: {
            id: id
        }
    });    

    return result;
}

module.exports = {
    getAllTransactions,
    getTransactionById,
    addTransaction,
    updateTransaction,
    deleteTransaction
}
