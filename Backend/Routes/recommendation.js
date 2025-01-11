const express = require('express');
const router = express.Router();
const {getRecommendations,generateRecommendations} = require('../Controllers/recommendationController');
const {authenticate} = require('../middleware/auth')
router.get('/recommendations',authenticate, getRecommendations);
router.post('/generate-recommendations', authenticate,generateRecommendations);

module.exports = router;
