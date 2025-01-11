const User = require('../model/userSchema');

// Get incoming friend requests
exports.getIncomingFriendRequests = async (req, res) => {
    try {
        // Find the user by their ID and populate the friendRequests (those who sent requests to the user)
        const user = await User.findById(req.user.id).populate('friendRequests', 'username _id');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the friend requests that are directed to the user
        res.status(200).json(user.friendRequests);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get sent friend requests
exports.getSentFriendRequests = async (req, res) => {
    try {
        // Find the user by their ID and populate the sentRequests (requests the user has sent to others)
        const user = await User.findById(req.user.id).populate('sentRequests', 'username _id');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the users to whom the friend request was sent
        res.status(200).json(user.sentRequests);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
