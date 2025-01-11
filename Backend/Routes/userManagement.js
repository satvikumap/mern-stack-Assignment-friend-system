const express = require("express")
const router = express.Router()
const { getUsers, getUserProfile } = require('../Controllers/userController');
const {authenticate} = require('../middleware/auth')

router.get('/',authenticate,getUsers);
router.get('/:id',authenticate,getUserProfile);

module.exports = router;
