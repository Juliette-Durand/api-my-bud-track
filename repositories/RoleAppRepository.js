const prisma = require('../config/prisma');

/**
 * Récupération de tous les rôles de l'application
 * @returns {Array} tableau des rôles
 */
async function getAllRoles() {

    const roles = await prisma.role_app.findMany();
    
    return roles;
}

/**
 * Récupération d'un rôle de l'application
 * @param {Number} id identifiant du rôle
 * @returns {Object} tableau du rôle correspondant à l'id
 */
async function getRoleById(id) {

    const role = await prisma.role_app.findUnique({
        where: {
            id: id
        }
    });
    
    return role;
}

/**
 * Ajout d'un rôle en base de données
 * @param {Object} role objet contenant les infos du rôle
 * @returns {Object} contenant les infos du rôle inséré
 */
async function addRole(role) {
    
    const { label } = role;

    const result = await prisma.role_app.create({
        data: {
            label: label
        }
    });

    return result;
}

/**
 * Modifier les informations d'un rôle via son id
 * @param {Number} id identifiant du rôle
 * @param {Object} role objet contenant les nouvelles infos du rôle
 * @returns {Object} contenant les infos du rôle modifié
 */
async function updateRole(id, role) {
    
    const { label } = role;

    const result = await prisma.role_app.update({
        where: {
            id: id
        },
        data: {
            label: label
        }
    });

    return result;
}

/**
 * Supprimer un rôle via son id
 * @param {Number} id identifiant du rôle
 * @returns {Object} contenant les infos du rôle supprimé
 */
async function deleteRole(id) {

    const result = await prisma.role_app.delete({
        where: {
            id: id
        }
    });    

    return result;
}

module.exports = {
    getAllRoles,
    getRoleById,
    addRole,
    updateRole,
    deleteRole
}