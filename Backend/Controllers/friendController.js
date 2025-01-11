const User = require('../model/userSchema');

// Send friend request
exports.sendFriendRequest = async (req, res) => {
  const { recipient } = req.body;
  const senderId = req.user.id;

  try {
    const sender = await User.findById(senderId);
    const recipientUser = await User.findById(recipient);

    if (!recipientUser) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    if (sender.friends.includes(recipient)) {
      return res.status(400).json({ message: 'You are already friends' });
    }

    if (sender.sentRequests.includes(recipient)) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    sender.sentRequests.push(recipient);
    recipientUser.friendRequests.push(senderId);

    await sender.save();
    await recipientUser.save();

    res.json({ message: 'Friend request sent' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending friend request' });
  }
};

// Accept friend request
exports.acceptFriendRequest = async (req, res) => {
  const { sender } = req.body;
  const recipientId = req.user.id;

  try {
    const recipient = await User.findById(recipientId);
    const senderUser = await User.findById(sender);

    if (!senderUser || !recipient) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the request from both sides
    const senderIndex = recipient.friendRequests.indexOf(sender);
    const recipientIndex = senderUser.sentRequests.indexOf(recipientId);

    if (senderIndex === -1 || recipientIndex === -1) {
      return res.status(400).json({ message: 'Friend request not found' });
    }

    recipient.friendRequests.splice(senderIndex, 1);
    senderUser.sentRequests.splice(recipientIndex, 1);

    // Add as friends
    recipient.friends.push(sender);
    senderUser.friends.push(recipientId);

    await recipient.save();
    await senderUser.save();

    res.json({ message: 'Friend request accepted' });
  } catch (err) {
    res.status(500).json({ message: 'Error accepting friend request' });
  }
};

// Reject friend request
exports.rejectFriendRequest = async (req, res) => {
  const { sender } = req.body;
  const recipientId = req.user.id;

  try {
    const recipient = await User.findById(recipientId);
    const senderUser = await User.findById(sender);

    if (!senderUser || !recipient) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the request from both sides
    const senderIndex = recipient.friendRequests.indexOf(sender);
    const recipientIndex = senderUser.sentRequests.indexOf(recipientId);

    if (senderIndex === -1 || recipientIndex === -1) {
      return res.status(400).json({ message: 'Friend request not found' });
    }

    recipient.friendRequests.splice(senderIndex, 1);
    senderUser.sentRequests.splice(recipientIndex, 1);

    await recipient.save();
    await senderUser.save();

    res.json({ message: 'Friend request rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting friend request' });
  }
};

// Unfriend a user
exports.unfriendUser = async (req, res) => {
  const { friendId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend || !user) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    // Filter the friendId from user's friends list
    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    // Filter the userId from friend's friends list
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.json({ message: 'Unfriended successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error unfriending user' });
  }
};


exports.getFriendList = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('friends', 'username');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching friend list' });
  }
};