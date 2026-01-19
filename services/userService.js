const userRepository = require('../repositories/userRepository.js');
const roleAppRepository = require('../repositories/roleAppRepository.js');

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
 * Récupère un utilisateur via son email
 */
async function findUserByEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
        throw new Error("L'adresse email est obligatoire");
    } else if (!emailRegex.test(email)) {
        throw new Error("L'adresse email n'est pas valide");
    }
    return await userRepository.getUserByEmail(email);
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

    // Récupération du rôle
    const roleId = 3;
    const userRole = await roleAppRepository.getRoleById(roleId);

    if (!userRole) {
        throw new Error("L'id du rôle demandé n'existe pas");
    } else if (userRole.label !== 'Utilisateur') {
        throw new Error(`Impossible d'affecter un rôle supérieur à Utilisateur pour un nouveau compte`);
    }

    user['role'] = roleId;
    console.log(user.role);
    
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
async function editUserEmail(id, user) {

    const { email } = user;

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
async function editUserRole(id, user) {

    const { roleId } = user

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
async function editUserPassword(id, user) {

    const { password } = user;

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

/**
 * Enregistre le token en base de données
 */
async function saveRefreshToken(refreshToken, userId) {
    return await userRepository.saveRefreshToken(refreshToken, userId);
}

module.exports = {
    findAllUsers,
    findUserById,
    findUserByEmail,
    createUser,
    editUserProfile,
    editUserEmail,
    editUserRole,
    editUserPassword,
    removeUser,
    saveRefreshToken
};