const express = require('express');
const router = express.Router();
const {getFriendRecommendations} = require('../Controllers/recommendationController');
const {authenticate} = require('../middleware/auth')
router.get('/recommendations',authenticate, getFriendRecommendations);

module.exports = router;
