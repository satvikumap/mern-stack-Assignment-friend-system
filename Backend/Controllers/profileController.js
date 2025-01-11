const User = require('../model/userSchema');

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { username, interests } = req.body;
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Only update fields if provided
      user.username = username || user.username;
      user.interests = interests && interests.length > 0 ? interests : user.interests;
  
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error updating profile' });
    }
  };

// Delete a user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
