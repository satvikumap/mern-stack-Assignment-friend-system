// src/api/index.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1', // Update with your backend URL
    withCredentials: true, // If you are handling cookies or sessions
});

export default api;
