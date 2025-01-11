import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';  // Axios instance
import { getToken } from '../utils/auth';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [interests, setInterests] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/profile/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const { username, interests } = response.data;
        setUsername(username);
        setInterests(interests.join(', ')); // Display interests as comma-separated string
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setMessage('Error loading profile');
      }
    };
  
    fetchUserProfile();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const updatedData = { 
        username, 
        interests: interests.split(',').map(i => i.trim()),  // Convert string to array
      };
      
      const response = await api.put(`/profile/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
  
      if (response.status === 200) {
        navigate('/'); // Redirect back to the home page after successful update
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await api.delete(`/profile/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      
      if (response.status === 200) {
        alert('Your account has been deleted!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
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
          <label htmlFor="interests" className="block text-gray-700">Interests (comma separated)</label>
          <input 
            type="text" 
            id="interests" 
            value={interests} 
            onChange={(e) => setInterests(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

       

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
