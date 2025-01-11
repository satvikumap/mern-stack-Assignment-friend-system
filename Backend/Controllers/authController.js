const User = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
dotenv.config();

// Signup
exports.signup = async (req, res) => {
    const { username, password, email } = req.body;

    // Validate input fields
    if (!username || !password || !email) {
        return res.status(403).send({
          success: false,
          message: "All fields are required",
        });
    }
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long",
        });
    }

    try {
        // Check if user already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email is already in use',
            });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username is already taken',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in' });
    }
};

// Logout
exports.logout = (req, res) => {
    // Since JWT is stateless, logging out is just a frontend action (clear token from localStorage/cookies)
    res.json({ message: 'Logged out successfully' });
};

// Get authenticated user profile
exports.getUserProfile = async (req, res) => {
    try {
        // Assuming req.user.id is populated from the JWT authentication middleware
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};

