const express = require('express');
const router = express.Router();
const {signup,login,logout,getUserProfile} = require('../Controllers/authController');
const {authenticate} = require('../middleware/auth')

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout',authenticate, logout);
router.get('/me', authenticate, getUserProfile);

module.exports = router;
