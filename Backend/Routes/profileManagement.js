const express = require('express');
const router = express.Router();
const { updateUserProfile, deleteUser} = require('../Controllers/profileController');
const {authenticate} = require('../middleware/auth')
// Update user profile
router.get('/:id',authenticate,updateUserProfile);

router.put('/:id',authenticate,updateUserProfile);

// Delete a user
router.delete('/:id',authenticate, deleteUser);

module.exports = router;
