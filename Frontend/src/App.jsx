// src/App.jsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/loginPage';
import Signup from './pages/signupPage';
import UpdateProfile from './pages/UpdateProfile'; // Import the new UpdateProfile component
import Home from './pages/homePage';
import { getToken } from './utils/auth';  // Helper to check if the user is authenticated


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a valid token is in localStorage
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        
        {/* Login route */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        
        {/* Signup route */}
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile/update/:id" element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;



