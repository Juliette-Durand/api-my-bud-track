const prisma = require('../config/prisma');

/**
 * Récupération de toutes les catégories de transactions
 * @returns {Array} tableau des catégories de transactions
 */
async function getAllCategories() {

    const categories = await prisma.categoryTransaction.findMany();
    
    return categories;
}

/**
 * Récupération d'une catégorie de transaction
 * @param {Number} id identifiant d'une catégorie de transaction
 * @returns {Object} tableau d'une catégorie de transaction correspondant à l'id
 */
async function getCategoryById(id) {

    const catTransaction = await prisma.categoryTransaction.findUnique({
        where: {
            id: id
        }
    });
    
    return catTransaction;
}

/**
 * Ajout d'une catégorie de transaction en base de données
 * @param {Object} catTransaction objet contenant les infos de la catégorie de transaction
 * @returns {Object} contenant les infos de la catégorie de transaction inséré
 */
async function addCategory(catTransaction) {
    
    const { label } = catTransaction;

    const result = await prisma.categoryTransaction.create({
        data: {
            label: label
        }
    });

    return result;
}

/**
 * Modifier les informations d'une catégorie de transaction via son id
 * @param {Number} id identifiant de la catégorie de transaction
 * @param {Object} role objet contenant les nouvelles infos de la catégorie de transaction
 * @returns {Object} contenant les infos de la catégorie de transaction modifiée
 */
async function updateCategory(id, catTransaction) {
    
    const { label } = catTransaction;

    const result = await prisma.categoryTransaction.update({
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
 * Supprimer une catégorie de transaction via son id
 * @param {Number} id identifiant de la catégorie de transaction
 * @returns {Object} contenant les infos de la catégorie de transaction supprimée
 */
async function deleteCategory(id) {

    const result = await prisma.categoryTransaction.delete({
        where: {
            id: id
        }
    });    

    return result;
}

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
}