const accountRepository = require('../repositories/accountRepository.js');

/**
 * Récupère la liste des comptes
 */
async function findAllAccounts() {
    return await accountRepository.getAllAccounts();
}

/**
 * Récupère un compte via son id
 */
async function findAccountById(id) {

    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await accountRepository.getAccountById(id);
}

/**
 * Récupère les comptes d'un utilisateur
 * @param {Number} userId identifiant de l'utilisateur
 */
async function findAccountsByUser(userId) {

    if (isNaN(userId)) {
        throw new Error("L'id doit être de type Number");
    }

    return await accountRepository.getAccountsByUser(userId);
}

/**
 * Ajoute un nouveau compte
 */
async function createAccount(account) {

    const { label, balance, typeAccountId } = account;   

    if (!label) {
        throw new Error("Le libellé est obligatoire");
    }
    if (balance === undefined || balance === null) {
        throw new Error("Le solde est obligatoire");
    }
    if (isNaN(balance)) {
        throw new Error("Le solde doit être de type Number");
    }
    if (typeAccountId === undefined || typeAccountId === null) {
        throw new Error("L'id du type de compte est obligatoire");
    }
    if (isNaN(typeAccountId)) {
        throw new Error("L'id du type de compte doit être de type Number");
    }
    
    return await accountRepository.addAccount(account);
}

/**
 * Modifie un compte existant
 */
async function editAccount(id, account) {

    const { label, balance, typeAccountId } = account;

    if (!label) {
        throw new Error("Le libellé est obligatoire");
    }
    if (balance === undefined || balance === null) {
        throw new Error("Le solde est obligatoire");
    }
    if (isNaN(balance)) {
        throw new Error("Le solde doit être de type Number");
    }
    if (typeAccountId === undefined || typeAccountId === null) {
        throw new Error("L'id du type de compte est obligatoire");
    }
    if (isNaN(typeAccountId)) {
        throw new Error("L'id du type de compte doit être de type Number");
    }
    
    return await accountRepository.updateAccount(id, account);
}

/**
 * Supprime un compte existant
 */
async function removeAccount(id) {
    
    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await accountRepository.deleteAccount(id);
}

module.exports = {
    findAllAccounts,
    findAccountById,
    findAccountsByUser,
    createAccount,
    editAccount,
    removeAccount
};
