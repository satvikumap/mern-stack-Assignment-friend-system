import React from 'react';

const FriendRecommendations = ({ recommendations, handleSendRequest }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Friend Recommendations</h3>
      {recommendations.length > 0 ? (
        recommendations.map((rec) => (
          <div key={rec.user._id} className="flex justify-between items-center mb-2">
            <div>
              <span className="font-semibold">{rec.user.username}</span>
              <p className="text-sm text-gray-500">
                {rec.mutualFriendsCount > 0 && `${rec.mutualFriendsCount} mutual friend(s)`} 
                {rec.commonInterestsCount > 0 && ` | Common Interests: ${rec.commonInterestsCount}`}
              </p>
            </div>
            <button
              onClick={() => handleSendRequest(rec.user._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send Request
            </button>
          </div>
        ))
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default FriendRecommendations;
