const catTransactionRepository = require('../repositories/catTransactionRepository.js');

/**
 * Récupère la liste des catégories de transactions
 */
async function findAllCategories() {
    return await catTransactionRepository.getAllCategories();
}

/**
 * Récupère une catégorie de transaction via son id
 */
async function findCategoryById(id) {

    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await catTransactionRepository.getCategoryById(id);
}

/**
 * Ajoute une nouvelle catégorie de transaction
 */
async function createCategory(typeAccount) {

    const { label, icon } = typeAccount;   

    if (!label) {
        throw new Error("Le libellé est obligatoire");
    }
    if (!icon) {
        throw new Error("L'icône est obligatoire");
    }
    
    return await catTransactionRepository.addCategory(typeAccount);
}

/**
 * Modifie une catégorie de transaction existante
 */
async function editCategory(id, typeAccount) {

    const { label, icon } = typeAccount;

    if (!label) {
        throw new Error("Le libellé est obligatoire");
    }
    if (!icon) {
        throw new Error("L'icône est obligatoire");
    }
    
    return await catTransactionRepository.updateCategory(id, typeAccount);
}

/**
 * Supprime une catégorie de transaction existante
 */
async function removeCategory(id) {
    
    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await catTransactionRepository.deleteCategory(id);
}

module.exports = {
    findAllCategories,
    findCategoryById,
    createCategory,
    editCategory,
    removeCategory
};