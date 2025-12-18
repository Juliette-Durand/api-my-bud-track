const userRepository = require('../repositories/userRepository.js');

/**
 * Récupère la liste des utilisateurs
 */
async function findAllUsers() {
    return await userRepository.getAllUsers();
}

/**
 * Récupère un utilisateur via son id
 */
async function findUserById(id) {

    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await userRepository.getUserById(id);
}

/**
 * Ajoute un nouvel utilisateur
 */
async function createUser(user) {

    const { lastname, firstname, email, password } = user;   
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailAlreadyExist = await userRepository.getUserByEmail(email);    

    if (!lastname) {
        throw new Error("Le nom de famille est obligatoire");
    }
    if (!firstname) {
        throw new Error("Le prénom est obligatoire");
    }
    if (!email) {
        throw new Error("L'adresse email est obligatoire");
    } else if (!emailRegex.test(email)) {
        throw new Error("L'adresse email n'est pas valide");
    } else if (emailAlreadyExist) {
        throw new Error("Cette adresse email est déjà utilisée");
    }
    if (!password) {
        throw new Error("Le mot de passe est obligatoire");
    }
    
    return await userRepository.addUser(user);
}

/**
 * Modifie les informations non sensibles d'un utilisateur
 */
async function editUserProfile(id, user) {

    const { firstname, lastname } = user;

    if (!firstname) {
        throw new Error("Le nom de famille est obligatoire");
    }
    if (!lastname) {
        throw new Error("Le prénom est obligatoire");
    }
    
    return await userRepository.updateUserProfile(id, user);
}

/**
 * Modifie l'email d'un utilisateur
 */
async function editUserEmail(id, email) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailAlreadyExist = await userRepository.getUserByEmail(email);    

    if (!email) {
        throw new Error("L'adresse email est obligatoire");
    } else if (!emailRegex.test(email)) {
        throw new Error("L'adresse email n'est pas valide");
    } else if (emailAlreadyExist) {
        throw new Error("Cette adresse email est déjà utilisée");
    }
    
    return await userRepository.updateUserEmail(id, email);
}

/**
 * Modifie le rôle d'un utilisateur
 */
async function editUserRole(id, roleId) {

    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    if (isNaN(roleId)) {
        throw new Error("L'id du rôle doit être de type Number");
    }
    
    return await userRepository.updateUserRole(id, roleId);
}

/**
 * Modifie le mot de passe d'un utilisateur
 */
async function editUserPassword(id, password) {

    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    if (!password) {
        throw new Error("Le mot de passe est obligatoire");
    }
    
    return await userRepository.updateUserPassword(id, password);
}

/**
 * Supprime un utilisateur
 */
async function removeUser(id) {
    
    if (isNaN(id)) {
        throw new Error("L'id doit être de type Number");
    }
    return await userRepository.deleteUser(id);
}

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    editUserProfile,
    editUserEmail,
    editUserRole,
    editUserPassword,
    removeUser
};