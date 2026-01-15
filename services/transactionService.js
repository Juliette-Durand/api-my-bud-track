const transactionRepository = require('../repositories/transactionRepository.js');

/**
 * Récupère la liste des transactions
 */
async function findAllTransactions() {
    return await transactionRepository.getAllTransactions();
}

/**
 * Récupère une transaction via son id
 */
async function findTransactionById(id) {

    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await transactionRepository.getTransactionById(id);
}

/**
 * Ajoute une nouvelle transaction
 */
async function createTransaction(transaction) {

    const { label, date, amount, type, categoryId, ownerId, srcAccountId, destAccountId } = transaction;

    if (!label) {
        throw new Error("Le libellé est obligatoire");
    }
    if (!date) {
        throw new Error("La date est obligatoire");
    }
    if (isNaN(Date.parse(date))) {
        throw new Error("La date n'est pas valide");
    }
    if (amount === undefined || amount === null) {
        throw new Error("Le montant est obligatoire");
    }
    if (isNaN(amount)) {
        throw new Error("Le montant doit être de type Number");
    }
    if (!type) {
        throw new Error("Le type est obligatoire");
    }
    if (type !== 'CREDIT' && type !== 'DEBIT') {
        throw new Error("Le type doit être CREDIT ou DEBIT");
    }
    if (categoryId === undefined || categoryId === null) {
        throw new Error("L'id de la catégorie est obligatoire");
    }
    if (isNaN(categoryId)) {
        throw new Error("L'id de la catégorie doit être de type Number");
    }
    if (ownerId === undefined || ownerId === null) {
        throw new Error("L'id du propriétaire est obligatoire");
    }
    if (isNaN(ownerId)) {
        throw new Error("L'id du propriétaire doit être de type Number");
    }
    if (srcAccountId === undefined || srcAccountId === null) {
        throw new Error("L'id du compte source est obligatoire");
    }
    if (isNaN(srcAccountId)) {
        throw new Error("L'id du compte source doit être de type Number");
    }
    if (destAccountId === undefined || destAccountId === null) {
        throw new Error("L'id du compte destination est obligatoire");
    }
    if (isNaN(destAccountId)) {
        throw new Error("L'id du compte destination doit être de type Number");
    }
    
    return await transactionRepository.addTransaction(transaction);
}

/**
 * Modifie une transaction existante
 */
async function editTransaction(id, transaction) {

    const { label, date, amount, type, categoryId, ownerId, srcAccountId, destAccountId } = transaction;

    if (!label) {
        throw new Error("Le libellé est obligatoire");
    }
    if (!date) {
        throw new Error("La date est obligatoire");
    }
    if (isNaN(Date.parse(date))) {
        throw new Error("La date n'est pas valide");
    }
    if (amount === undefined || amount === null) {
        throw new Error("Le montant est obligatoire");
    }
    if (isNaN(amount)) {
        throw new Error("Le montant doit être de type Number");
    }
    if (!type) {
        throw new Error("Le type est obligatoire");
    }
    if (type !== 'CREDIT' && type !== 'DEBIT') {
        throw new Error("Le type doit être CREDIT ou DEBIT");
    }
    if (categoryId === undefined || categoryId === null) {
        throw new Error("L'id de la catégorie est obligatoire");
    }
    if (isNaN(categoryId)) {
        throw new Error("L'id de la catégorie doit être de type Number");
    }
    if (ownerId === undefined || ownerId === null) {
        throw new Error("L'id du propriétaire est obligatoire");
    }
    if (isNaN(ownerId)) {
        throw new Error("L'id du propriétaire doit être de type Number");
    }
    if (srcAccountId === undefined || srcAccountId === null) {
        throw new Error("L'id du compte source est obligatoire");
    }
    if (isNaN(srcAccountId)) {
        throw new Error("L'id du compte source doit être de type Number");
    }
    if (destAccountId === undefined || destAccountId === null) {
        throw new Error("L'id du compte destination est obligatoire");
    }
    if (isNaN(destAccountId)) {
        throw new Error("L'id du compte destination doit être de type Number");
    }
    
    return await transactionRepository.updateTransaction(id, transaction);
}

/**
 * Supprime une transaction existante
 */
async function removeTransaction(id) {
    
    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await transactionRepository.deleteTransaction(id);
}

module.exports = {
    findAllTransactions,
    findTransactionById,
    createTransaction,
    editTransaction,
    removeTransaction
};
