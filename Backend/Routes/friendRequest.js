const express = require("express")
const router = express.Router()
const {getIncomingFriendRequests ,getSentFriendRequests} = require('../Controllers/friendRequestController');
const {authenticate} = require('../middleware/auth')
// Get all incoming friend requests
router.get('/requests',authenticate, getIncomingFriendRequests);

// Get all sent friend requests
router.get('/sent-requests',authenticate, getSentFriendRequests);

module.exports = router;
