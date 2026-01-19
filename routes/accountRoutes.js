const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.get('/', accountController.getAllAccounts);
router.get('/:id', authMiddleware, accountController.getAccountById);
router.get('/:userId', accountController.getAccountsByUser);
router.post('/', accountController.createAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;