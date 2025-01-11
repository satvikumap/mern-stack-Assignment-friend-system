import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';  // Axios instance
import { getToken } from '../utils/auth';  // Function to get the token from localStorage or cookies

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [interests, setInterests] = useState([]);
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL

  const availableInterests = ['Cooking', 'Gym', 'Gaming', 'Reading', 'Music', 'Traveling', 'Technology', 'Photography'];

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = getToken(); // Get the authentication token
      if (!token) {
        setMessage('You must be logged in to view your profile.');
        return;
      }

      try {
        const response = await api.get(`/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { username, interests } = response.data;
        setUsername(username);
        setInterests(interests); // Assuming interests is an array
      } catch (error) {
        console.error('Error fetching profile data:', error);
        if (error.response && error.response.status === 401) {
          setMessage('Unauthorized. Please log in again.');
        } else {
          setMessage('Error loading profile.');
        }
      }
    };

    fetchUserProfile();
  }, [id]);

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken(); // Get the authentication token
    if (!token) {
      setMessage('You must be logged in to update your profile.');
      return;
    }

    // Prepare data to be sent to the backend
    const updatedData = {
      username,
      interests, // Interests should now be an array
    };

    try {
      const response = await api.put(`/profile/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        navigate('/'); // Redirect to the home page after successful update
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.status === 401) {
        setMessage('Unauthorized. Please log in again.');
      } else {
        setMessage('Error updating profile.');
      }
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const token = getToken(); // Get the authentication token
    if (!token) {
      setMessage('You must be logged in to delete your account.');
      return;
    }

    try {
      const response = await api.delete(`/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert('Your account has been deleted!');
        navigate('/login'); // Redirect to the login page after deletion
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage('Error deleting account.');
    }
  };

  const handleInterestChange = (e) => {
    const selectedInterests = Array.from(e.target.selectedOptions, option => option.value);
    setInterests(selectedInterests);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
      {message && <p className="text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="interests" className="block text-gray-700">Interests</label>
          <select
            id="interests"
            multiple
            value={interests}
            onChange={handleInterestChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            {availableInterests.map((interest, index) => (
              <option key={index} value={interest}>{interest}</option>
            ))}
          </select>
          <p className="text-gray-500 text-sm mt-1">Hold down the Ctrl (Windows) or Command (Mac) key to select multiple interests.</p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>

      <button
        onClick={handleDeleteAccount}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
      >
        Delete Account
      </button>
    </div>
  );
};

export default UpdateProfile;
