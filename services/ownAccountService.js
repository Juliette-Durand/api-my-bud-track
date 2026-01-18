const ownAccountRepository = require('../repositories/ownAccountRepository.js');

/**
 * Ajoute une relation OwnAccount
 */
async function createOwnAccount(ownAccount) {
    const { userId, accountId } = ownAccount;

    if (isNaN(userId) || isNaN(accountId)) {
        throw new Error("Les identifiants userId et accountId doivent être de type Number");
    }

    return await ownAccountRepository.addOwnAccount(ownAccount);
}

/**
 * Supprime une relation OwnAccount
 */
async function removeOwnAccount(userId, accountId) {
    if (isNaN(userId) || isNaN(accountId)) {
        throw new Error("Les identifiants userId et accountId doivent être de type Number");
    }

    return await ownAccountRepository.deleteOwnAccount(userId, accountId);
}

module.exports = {
    createOwnAccount,
    removeOwnAccount
};