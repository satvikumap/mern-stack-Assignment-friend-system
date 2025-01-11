// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';  // Import the Axios instance for API requests
import { setToken } from '../utils/auth';  // Helper to save token

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the login request to the backend API
      const response = await api.post('/auth/login', { email, password });
      
      // Get the token from the response
      const { token } = response.data;

      // Store the token in localStorage
      setToken(token);
      window.location.reload();
      // Redirect to the Home page
      navigate('/');
    } catch (err) {
      // Handle error from login
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
        <div className="text-center mt-4">
          <p>Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
