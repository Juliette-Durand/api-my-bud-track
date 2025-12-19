const express = require('express');
const router = express.Router();
const catTransactionController = require('../controllers/catTransactionController.js');

router.get('/', catTransactionController.getAllCategories);
router.get('/:id', catTransactionController.getCategoryById);
router.post('/', catTransactionController.createCategory);
router.put('/:id', catTransactionController.updateCategory);
router.delete('/:id', catTransactionController.deleteCategory);

module.exports = router;