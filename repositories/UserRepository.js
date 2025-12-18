const prisma = require('../config/prisma');

/**
 * Récupération de tous les utilisateurs
 * @returns {Array} tableau de tous les utilisateurs
 */
async function getAllUsers() {

    const users = await prisma.user.findMany({
        select: {
            id: true,
            lastname: true,
            firstname: true,
            email: true,
            roleApp: {
                select: { label: true }
            }
        },
        where: {
            isActive: true
        }
    });

    return users;
}

/**
 * Récupération d'un utilisateur
 * @param {Number} id identifiant de l'utilisateur
 * @returns {Object} tableau du utilisateur correspondant à l'id
 */
async function getUserById(id) {

    const user = await prisma.user.findUnique({
        select: {
            id: true,
            lastname: true,
            firstname: true,
            email: true,
            roleApp: {
                select: {
                    id: true,
                    label: true
                }
            }
        },
        where: {
            id: id,
            isActive: true
        }
    });

    return user;
}

/**
 * Récupération d'un utilisateur via son email
 * @param {String} email email de l'utilisateur
 * @returns {Object} tableau du utilisateur correspondant à l'id
 */
async function getUserByEmail(email) {

    const user = await prisma.user.findUnique({
        select: {
            email: true,
            password: true
        },
        where: {
            email: email,
        }
    });

    return user;
}

/**
 * Ajout d'un utilisateur en base de données
 * @param {Object} user objet contenant les infos d'un utilisateur
 * @returns {Object} contenant les infos du utilisateur inséré
 */
async function addUser(user) {
    const { lastname, firstname, email, password } = user;

    const dateCreate = new Date();

    const result = await prisma.user.create({
        data: {
            lastname,
            firstname,
            email,
            password,
            createdAt: dateCreate,
            roleApp: {
                connect: { id: 1 } // rôle par défaut
            }
        },
        select: {
            id: true,
            lastname: true,
            firstname: true,
            email: true,
            createdAt: true,
            isActive: true,
            roleApp: true
        }
    });

    return result;
}


/**
 * Modifier les informations de profil d'un utilisateur via son id
 * Données non sensibles uniquement
 * @param {Number} id identifiant de l'utilisateur
 * @param {Object} user objet contenant les nouvelles infos du utilisateur
 * @returns {Object} contenant les infos du utilisateur modifié
 */
async function updateUserProfile(id, data) {
    const { firstname, lastname } = data;

    return prisma.user.update({
        where: { id },
        data: {
            ...(firstname && { firstname }),
            ...(lastname && { lastname })
        },
        select: {
            id: true,
            firstname: true,
            lastname: true
        }
    });
}

/**
 * Modifier l'email d'un utilisateur via son id
 * Accessible seulement par l'utilisateur lui-même
 * @param {Number} id identifiant de l'utilisateur
 * @param {string} newEmail nouvelle adresse email de l'utilisateur
 * @returns {Object} contenant les infos modifiées de l'utilisateur
 */
async function updateUserEmail(id, newEmail) {
    return prisma.user.update({
        where: { id },
        data: {
            email: newEmail
        },
        select: {
            id: true,
            email: true
        }
    });
}

/**
 * Modifier le rôle d'un utilisateur via son id
 * Accessible seulement par un administrateur
 * @param {Number} id identifiant de l'utilisateur
 * @param {Number} roleAppId identifiant du nouveau rôle de l'utilisateur
 * @returns {Object} contenant les infos modifiées de l'utilisateur
 */
async function updateUserRole(id, roleAppId) {
    return prisma.user.update({
        where: { id },
        data: {
            roleApp: {
                connect: { id: roleAppId }
            }
        },
        select: {
            id: true,
            roleApp: true
        }
    });
}

/**
 * Modifier le mot de passe d'un utilisateur via son id
 * Accessible seulement par l'utilisateur lui-même
 * @param {Number} id identifiant de l'utilisateur
 * @param {string} hashedPassword nouveau mot de passe haché de l'utilisateur
 * @returns {Object} contenant les infos modifiées de l'utilisateur
 */
async function updateUserPassword(id, hashedPassword) {
    return prisma.user.update({
        where: { id },
        data: {
            password: hashedPassword
        }
    });
}

/**
 * Supprimer un utilisateur via son id
 * @param {Number} id identifiant de l'utilisateur
 * @returns {Object} contenant les infos du utilisateur supprimé
 */
async function deleteUser(id) {

    const result = await prisma.user.delete({
        where: {
            id: id,
        }
    });

    return result;
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    addUser,
    updateUserProfile,
    updateUserEmail,
    updateUserRole,
    updateUserPassword,
    deleteUser
}