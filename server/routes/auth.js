const express = require('express');
const router = express.Router();
const User= require('../Models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { Username, email, password } = req.body; // Ensure these keys match your frontend

        if (!Username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // New User
        const newUser = new User({
            Username,
            email,
            password: hashedPassword
        });

        // Save User to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ UserId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ 
            token,
            message: 'User registered successfully!' 
        });
    } catch (error) {
        console.error('Error registering User:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request payload
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if User exists
        const foundUser = await User.findOne({ email }); // Change here
        if (!foundUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, foundUser.password); // Change here
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = { UserId: foundUser._id }; // Change here
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    token,
                    message: `Welcome back, ${foundUser.Username}!` // Change here
                });
            }
        );
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
});

module.exports = router;

module.exports = router;