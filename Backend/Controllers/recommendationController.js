const User = require('../model/userSchema');
const FriendRecommendation = require('../model/friendRecommendationSchema');

// Get friend recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await FriendRecommendation.findOne({ user: req.user.id }).populate('recommendations.friend');
    if (!recommendations) {
      return res.status(404).json({ message: 'No recommendations found' });
    }
    res.json(recommendations.recommendations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
};

// Generate friend recommendations (this can be based on mutual friends or interests)
exports.generateRecommendations = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Logic to generate recommendations
    // Example: find mutual friends or common interests and suggest them
    const allUsers = await User.find({ _id: { $ne: userId } });

    let recommendations = [];

    allUsers.forEach((potentialFriend) => {
      let mutualFriendsCount = 0;
      let commonInterests = [];

      // Check for mutual friends and common interests
      user.friends.forEach((friendId) => {
        if (potentialFriend.friends.includes(friendId)) {
          mutualFriendsCount++;
        }
      });

      commonInterests = user.interests.filter((interest) =>
        potentialFriend.interests.includes(interest)
      );

      if (mutualFriendsCount > 0 || commonInterests.length > 0) {
        recommendations.push({
          friend: potentialFriend._id,
          mutualFriends: mutualFriendsCount,
          commonInterests: commonInterests,
        });
      }
    });

    const recommendation = new FriendRecommendation({
      user: userId,
      recommendations,
    });

    await recommendation.save();
    res.json({ message: 'Recommendations generated' });
  } catch (err) {
    res.status(500).json({ message: 'Error generating recommendations' });
  }
};
