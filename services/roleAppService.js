const roleAppRepository = require('../repositories/roleAppRepository.js');

/**
 * Récupère la liste des rôles de l'application
 */
async function findAllRoles() {
    return await roleAppRepository.getAllRoles();
}

/**
 * Récupère un rôle via son id
 */
async function findRoleById(id) {

    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await roleAppRepository.getRoleById(id);
}

/**
 * Ajoute un nouveau rôle
 */
async function createRole(role) {

    const { label } = role;   

    if (!label) {
        throw new Error("Le libellé est obligatoire");
    }
    
    return await roleAppRepository.addRole(role);
}

/**
 * Modifie un rôle existant
 */
async function editRole(id, role) {

    const { label } = role;

    if (!label) {
        throw new Error("Le libellé est obligatoire");
    }
    
    return await roleAppRepository.updateRole(id, role);
}

/**
 * Supprime un rôle existant
 */
async function removeRole(id) {
    
    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await roleAppRepository.deleteRole(id);
}

module.exports = {
    findAllRoles,
    findRoleById,
    createRole,
    editRole,
    removeRole
};