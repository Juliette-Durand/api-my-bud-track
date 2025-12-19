const prisma = require('../config/prisma');

/**
 * Récupération de tous les types de comptes
 * @returns {Array} tableau des types de compte
 */
async function getAllTypes() {

    const roles = await prisma.typeAccount.findMany();
    
    return roles;
}

/**
 * Récupération d'un type de compte
 * @param {Number} id identifiant du type de compte
 * @returns {Object} tableau du type de compte correspondant à l'id
 */
async function getTypeById(id) {

    const role = await prisma.typeAccount.findUnique({
        where: {
            id: id
        }
    });
    
    return role;
}

/**
 * Ajout d'un type de compte en base de données
 * @param {Object} typeAccount objet contenant les infos du type de compte
 * @returns {Object} contenant les infos du type de compte inséré
 */
async function addType(typeAccount) {
    
    const { label } = typeAccount;

    const result = await prisma.typeAccount.create({
        data: {
            label: label
        }
    });

    return result;
}

/**
 * Modifier les informations d'un type de compte via son id
 * @param {Number} id identifiant du type de compte
 * @param {Object} role objet contenant les nouvelles infos du type de compte
 * @returns {Object} contenant les infos du type de compte modifié
 */
async function updateType(id, role) {
    
    const { label } = role;

    const result = await prisma.typeAccount.update({
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
 * Supprimer un type de compte via son id
 * @param {Number} id identifiant du type de compte
 * @returns {Object} contenant les infos du type de compte supprimé
 */
async function deleteType(id) {

    const result = await prisma.typeAccount.delete({
        where: {
            id: id
        }
    });    

    return result;
}

module.exports = {
    getAllTypes,
    getTypeById,
    addType,
    updateType,
    deleteType
}