import React from 'react';
import UserProfileLogo from './UserProfileLogo'; // Import the logo component

const PendingRequests = ({ requests, handleAcceptRequest, handleRejectRequest }) => {
  return (
    <div className="my-5 space-y-4">
      <h3 className="text-lg font-semibold">Pending Friend Requests</h3>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        requests.map((request) => (
          <div key={request._id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <UserProfileLogo username={request.username}  />
              <span className="text-lg">{request.username}</span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleAcceptRequest(request._id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleRejectRequest(request._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingRequests;
