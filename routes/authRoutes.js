const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const refreshToken = require('../middlewares/refreshTokenMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js')

router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.post('/refresh', refreshToken, authController.getRefreshToken);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;