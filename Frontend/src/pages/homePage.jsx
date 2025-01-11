import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios instance
import { getToken, removeToken } from '../utils/auth';
import SearchBox from '../components/SearchBox';
import UserProfileLogo from '../components/UserProfileLogo';
import FriendList from '../components/FriendList';
import PendingRequests from '../components/PendingRequests'; // Component for pending friend requests
import FriendRecommendations from '../components/FriendRecommendations'; // Import FriendRecommendations component

const Home = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]); // All users
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users based on search
  const [friends, setFriends] = useState([]); // Friend list
  const [pendingRequests, setPendingRequests] = useState([]); // Pending requests
  const [username, setUsername] = useState(''); // Current user's username
  const [currentUserId, setCurrentUserId] = useState(''); // Current user's ID
  const [recommendations, setRecommendations] = useState([]); 
  // Fetch all users, friends, and pending requests on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user's profile
        const profileResponse = await api.get('/auth/me', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setUsername(profileResponse.data.username); // Set current user's username
        setCurrentUserId(profileResponse.data._id); // Set current user's ID

        const recommendationsResponse = await api.get('/friend-recommendation/recommendations', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setRecommendations(recommendationsResponse.data.recommendations);
        // Fetch all users
        const usersResponse = await api.get('/user/', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });



        // Exclude the current user from the user list
        const filteredUserList = usersResponse.data.filter(user => user._id !== profileResponse.data._id);
        setUsers(filteredUserList);
        setFilteredUsers(filteredUserList);

        // Fetch current user's friend list
        const friendListResponse = await api.get('/friend-management/friend-list', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setFriends(friendListResponse.data || []); // Set friends list

        // Fetch incoming friend requests (requests user has received)
        const incomingRequestsResponse = await api.get('/friend-request/requests', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        
        setPendingRequests(incomingRequestsResponse.data || []); // Set pending requests

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle search input change
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Handle sending a friend request
  const handleSendRequest = async (userId) => {
    try {
      await api.post('/friend-management/send-request', { recipient: userId }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      alert('Friend request sent!');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  // Handle accepting a friend request
  const handleAcceptRequest = async (userId) => {
    try {
      await api.post('/friend-management/accept-request', { sender: userId }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      // Update state to reflect accepted request
      setPendingRequests((prev) => prev.filter(request => request._id !== userId));

      // Optionally, you can refetch the friend list to keep it updated.
      const friendListResponse = await api.get('/friend-management/friend-list', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setFriends(friendListResponse.data || []);

    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  // Handle rejecting a friend request
  const handleRejectRequest = async (userId) => {
    try {
      await api.post('/friend-management/reject-request', { sender: userId }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      // Update state to reflect rejected request
      setPendingRequests((prev) => prev.filter(request => request._id !== userId));

    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  // Handle unfriend action
  const handleUnfriend = async (friendId) => {
    try {
      await api.delete('/friend-management/unfriend', {
        headers: { Authorization: `Bearer ${getToken()}` },
        data: { friendId },
      });

      // Update the friend list locally by filtering out the unfriended user
      setFriends((prev) => prev.filter(friend => friend._id !== friendId));

    } catch (error) {
      console.error('Error unfriending user:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    removeToken(); // Clear token from localStorage
    window.location.reload();
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Section: User Profiles */}
      <div className="w-1/4 bg-white p-4 border-r border-gray-300">
        <div className="flex justify-between items-center m-2">
          <h2 className="text-xl font-semibold ">{username}</h2>
          <p
            onClick={() => navigate(`/profile/update/${currentUserId}`)} 
            className=" text-blue-600 cursor-pointer "
          >
            Update Profile
          </p>
          
        </div>
        <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />

        {/* Displaying list of users */}
        <div className="space-y-4 mt-4">
          {filteredUsers.map((user) => (
            <div key={user._id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <UserProfileLogo username={user.username} />
                <span className="text-lg">{user.username}</span>
              </div>
              <button
                onClick={() => handleSendRequest(user._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Send Request
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Friend List */}
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold mb-4">My Friends</h2>

        {/* Displaying the current user's friends list */}
        <FriendList friends={friends} handleUnfriend={handleUnfriend} />

        {/* Displaying pending friend requests */}
        <PendingRequests 
          requests={pendingRequests}
          handleAcceptRequest={handleAcceptRequest}
          handleRejectRequest={handleRejectRequest}
        />

      {recommendations.length > 0 ? (
                  <FriendRecommendations
                    recommendations={recommendations}
                    handleSendRequest={handleSendRequest}
                  />
                ) : (
                  <p className="text-red-500">
                    Add interests to get personalized friend recommendations! 
                    <button
                      onClick={() => navigate(`/profile/update/${currentUserId}`)}
                      className="text-blue-500"
                    >
                      Update Profile
                    </button>
                  </p>
                )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute bottom-4 left-4 bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
