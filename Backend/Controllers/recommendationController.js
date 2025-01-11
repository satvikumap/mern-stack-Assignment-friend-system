const User = require('../model/userSchema');

// Get mutual friends count
const getMutualFriends = async (userId, targetUserId) => {
  const user = await User.findById(userId).populate('friends');
  const targetUser = await User.findById(targetUserId).populate('friends');

  const userFriends = user.friends.map(friend => friend._id.toString());
  const targetUserFriends = targetUser.friends.map(friend => friend._id.toString());

  const mutualFriends = userFriends.filter(friendId =>
    targetUserFriends.includes(friendId)
  );
  return mutualFriends.length;
};

// Helper function to get common interests
const getCommonInterests = (userInterests, targetUserInterests) => {
  return userInterests.filter(interest => targetUserInterests.includes(interest)).length;
};

// Controller to fetch friend recommendations
const getFriendRecommendations = async (req, res) => {
  try {
    const userId = req.user.id; // assuming userId is stored in req.user after authentication
    const user = await User.findById(userId);

    // Step 1: Get all users except the current user
    const users = await User.find({ _id: { $ne: userId } });

    // Step 2: Filter and score users based on mutual friends and common interests
    const recommendations = await Promise.all(users.map(async (targetUser) => {
      const mutualFriendsCount = await getMutualFriends(userId, targetUser._id);
      const commonInterestsCount = getCommonInterests(user.interests, targetUser.interests);

      // If mutual friends exist, prioritize them; otherwise, use common interests
      let recommendationScore = 0;
      
      if (mutualFriendsCount > 0) {
        // Combine mutual friends and common interests for a recommendation score
        recommendationScore = mutualFriendsCount + commonInterestsCount;
      } else if (commonInterestsCount > 0) {
        // If no mutual friends, but there are common interests, use common interests
        recommendationScore = commonInterestsCount;
      }

      // Only return the user if they have a recommendation score greater than 0
      if (recommendationScore > 0) {
        return {
          user: targetUser,
          mutualFriendsCount,
          commonInterestsCount,
          recommendationScore
        };
      }
      return null; // If no mutual friends and no common interests, return null
    }));

    // Filter out null values (users without mutual friends or common interests)
    const filteredRecommendations = recommendations.filter(recommendation => recommendation !== null);

    // Step 3: Sort recommendations by the recommendation score (highest first)
    filteredRecommendations.sort((a, b) => b.recommendationScore - a.recommendationScore);

    // Step 4: Return the recommendations
    res.status(200).json({ recommendations: filteredRecommendations });
  } catch (error) {
    res.status(500).json({ message: 'Error getting friend recommendations', error });
  }
};

module.exports = { getFriendRecommendations };
