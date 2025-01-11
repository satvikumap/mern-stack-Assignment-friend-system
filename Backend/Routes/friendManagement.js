const express = require('express');
const router = express.Router();
const {sendFriendRequest,acceptFriendRequest,rejectFriendRequest,unfriendUser,getFriendList} = require('../Controllers/friendController');
const {authenticate} = require('../middleware/auth')

router.post('/send-request', authenticate,sendFriendRequest);
router.post('/accept-request',authenticate,acceptFriendRequest);
router.post('/reject-request',authenticate, rejectFriendRequest);
router.get('/friend-list', authenticate, getFriendList);
router.delete('/unfriend', authenticate,unfriendUser);

module.exports = router;
