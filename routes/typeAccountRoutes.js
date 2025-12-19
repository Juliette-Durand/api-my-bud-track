const express = require('express');
const router = express.Router();
const typeAccountController = require('../controllers/typeAccountController.js');

router.get('/', typeAccountController.getAllTypes);
router.get('/:id', typeAccountController.getTypeById);
router.post('/', typeAccountController.createType);
router.put('/:id', typeAccountController.updateType);
router.delete('/:id', typeAccountController.deleteType);

module.exports = router;