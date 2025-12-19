const typeAccountRepository = require('../repositories/typeAccountRepository.js');

/**
 * Récupère la liste des types de compte
 */
async function findAllTypes() {
    return await typeAccountRepository.getAllTypes();
}

/**
 * Récupère un type de compte via son id
 */
async function findTypeById(id) {

    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await typeAccountRepository.getTypeById(id);
}

/**
 * Ajoute un nouveau rôle
 */
async function createType(role) {

    const { label } = role;   

    if (!label) {
        throw new Error("Le libellé est obligatoire");
    }
    
    return await typeAccountRepository.addType(role);
}

/**
 * Modifie un rôle existant
 */
async function editType(id, role) {

    const { label } = role;

    if (!label) {
        throw new Error("Le libellé est obligatoire");
    }
    
    return await typeAccountRepository.updateType(id, role);
}

/**
 * Supprime un rôle existant
 */
async function removeType(id) {
    
    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await typeAccountRepository.deleteType(id);
}

module.exports = {
    findAllTypes,
    findTypeById,
    createType,
    editType,
    removeType
};