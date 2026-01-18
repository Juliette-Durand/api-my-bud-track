const prisma = require('../config/prisma');

/**
 * Ajout d'une relation OwnAccount
 * @param {Object} data données de la relation
 * @returns {Object} relation OwnAccount créée
 */
async function addOwnAccount(data) {
    const { userId, accountId } = data;

    const result = await prisma.ownAccount.create({
        data: {
            userId: userId,
            accountId: accountId
        },
        select: {
            userId: true,
            accountId: true
        }
    });

    return result;
}

/**
 * Suppression d'une relation OwnAccount
 * @param {Number} userId identifiant de l'utilisateur
 * @param {Number} accountId identifiant du compte
 * @returns {Object} relation OwnAccount supprimée
 */
async function deleteOwnAccount(userId, accountId) {

    const result = await prisma.ownAccount.delete({
        where: {
            userId_accountId: {
                userId: userId,
                accountId: accountId
            }
        }
    });

    return result;
}

module.exports = {
    addOwnAccount,
    deleteOwnAccount
};