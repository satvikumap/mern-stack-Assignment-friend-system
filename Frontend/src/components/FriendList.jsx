import React from 'react';
import UserProfileLogo from './UserProfileLogo'; // Import the logo component

const FriendList = ({ friends, handleUnfriend }) => {
  return (
    <div className="space-y-4">
      {friends.length === 0 ? (
        <p>No friends added yet.</p>
      ) : (
        friends.map((friend) => (
          <div key={friend._id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <UserProfileLogo username={friend.username} />
              <span className="text-lg">{friend.username}</span>
            </div>
            <button
              onClick={() => handleUnfriend(friend._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Unfriend
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendList;
