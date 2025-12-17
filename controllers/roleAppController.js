const roleAppService = require('../services/roleAppService.js');

/**
 * Récupère la liste des rôles de l'application
 */
async function getAllRoles(req, res) {
    try {
        const roles = await roleAppService.findAllRoles();
    
        if (roles.length > 0) {
            const message = {
                succeed: true,
                data: roles
            }
            res.status(200).json(message);
        } else {
            res.status(404).json({ message: "Aucun rôle" });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

/**
 * Récupère un rôle via son id
 */
async function getRoleById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const role = await roleAppService.findRoleById(id);
        
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: "Rôle introuvable" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

/**
 * Ajoute un nouveau rôle
 */
async function createRole(req, res) {
    try {
        await roleAppService.createRole(req.body);
        res.status(201).json({ status: "success", message: "Rôle ajouté avec succès" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

/**
 * Modifie un rôle existant
 */
async function updateRole(req, res) {
    try {
        const id = parseInt(req.params.id);
        await roleAppService.editRole(id, req.body);
        res.status(201).json({ status: "success", message: "Rôle modifié avec succès" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

/**
 * Supprime un rôle existant
 */
async function deleteRole(req, res) {
    try {
        const id = parseInt(req.params.id);
        const role = await roleAppService.findRoleById(id);
        if (role) {
            await roleAppService.removeRole(id);
            res.status(200).json({ status: "success", message: "Rôle supprimé avec succès" });
        } else {
            res.status(404).send({ message: "Rôle introuvable" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};