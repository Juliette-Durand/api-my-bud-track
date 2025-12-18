const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUserProfile);
router.put('/:id/email', userController.updateUserEmail);
router.put('/:id/role', userController.updateUserRole);
router.put('/:id/password', userController.updateUserPassword);
router.delete('/:id', userController.deleteUser);

module.exports = router;