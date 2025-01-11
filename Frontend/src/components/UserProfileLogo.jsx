import React from 'react';

// UserProfileLogo component for displaying the user's initials in a circle
const UserProfileLogo = ({ username, size = 32 }) => {
  // Fallback to "U" if no username is provided
  const initials = username ? username[0].toUpperCase() : 'Error';

  return (
    <div
      className="flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size / 2}px`,
        color: 'white',
        fontWeight: '600',
      }}
    >
      {initials}
    </div>
  );
};

export default UserProfileLogo;
