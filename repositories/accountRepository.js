const prisma = require('../config/prisma');

/**
 * Récupération de tous les comptes
 * @returns {Array} tableau des comptes
 */
async function getAllAccounts() {
    return await prisma.account.findMany({
        where: {
            isActive: true
        },
        include: {
            typeAccount: {
                select: {
                    id: true,
                    label: true
                }
            },
            owners: {
                include: {
                    user: {
                        select: {
                            id: true,
                            firstname: true,
                            lastname: true,
                            email: true
                        }
                    }
                }
            }
        }
    });
}

/**
 * Récupération d'un compte
 * @param {Number} id identifiant du compte
 * @returns {Object} tableau du compte correspondant à l'id
 */
async function getAccountById(id) {

    const account = await prisma.account.findFirst({
        where: {
            id: id,
            isActive: true
        },
        include: {
            typeAccount: {
                select: {
                    id: true,
                    label: true
                }
            },
            owners: {
                include: {
                    user: {
                        select: {
                            id: true,
                            firstname: true,
                            lastname: true,
                            email: true
                        }
                    }
                }
            }
        }
    });

    return account;
}

/**
 * Récupération des comptes d'un utilisateur
 * @param {Number} userId identifiant de l'utilisateur
 * @returns {Array} tableau des comptes liés à l'utilisateur
 */
async function getAccountsByUser(userId) {

    const accounts = await prisma.account.findMany({
        where: {
            isActive: true,
            ownAccounts: {
                some: {
                    userId: userId
                }
            }
        },
        include: {
            typeAccount: {
                select: {
                    id: true,
                    label: true
                }
            }
        }
    });

    return accounts;
}

/**
 * Ajout d'un compte en base de données
 * @param {Object} account objet contenant les infos du compte
 * @returns {Object} contenant les infos du compte inséré
 */
async function addAccount(account) {

    const { label, balance, typeAccountId } = account;

    const result = await prisma.account.create({
        data: {
            label: label,
            balance: balance,
            typeAccount: {
                connect: { id: typeAccountId }
            }
        }
    });

    return result;
}

/**
 * Modifier les informations d'un compte via son id
 * @param {Number} id identifiant du compte
 * @param {Object} account objet contenant les nouvelles infos du compte
 * @returns {Object} contenant les infos du compte modifié
 */
async function updateAccount(id, account) {

    const { label, balance, typeAccountId } = account;

    const result = await prisma.account.update({
        where: {
            id: id
        },
        data: {
            label: label,
            balance: balance,
            typeAccount: {
                connect: { id: typeAccountId }
            }
        }
    });

    return result;
}

/**
 * Supprimer un compte via son id
 * @param {Number} id identifiant du compte
 * @returns {Object} contenant les infos du compte supprimé
 */
async function deleteAccount(id) {

    const result = await prisma.account.delete({
        where: {
            id: id
        }
    });

    return result;
}

module.exports = {
    getAllAccounts,
    getAccountById,
    addAccount,
    updateAccount,
    deleteAccount
}
