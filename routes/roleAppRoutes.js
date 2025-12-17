const express = require('express');
const router = express.Router();
const roleAppController = require('../controllers/roleAppController.js');

router.get('/', roleAppController.getAllRoles);
router.get('/:id', roleAppController.getRoleById);
router.post('/', roleAppController.createRole);
router.put('/:id', roleAppController.updateRole);
router.delete('/:id', roleAppController.deleteRole);

module.exports = router;