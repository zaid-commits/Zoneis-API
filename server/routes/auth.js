const express = require('express');
const router = express.Router();
const user= require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate request payload
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existinguser = await user.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ message: 'user already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newuser = new user({
            username,
            email,
            password: hashedPassword
        });

        // Save user to database
        await newuser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ 
            token,
            message: 'user registered successfully!' 
        });
    } catch (error) {
        console.error('Error registering user:', error);
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

        // Check if user exists
        const user = await user.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = { userId: user._id };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    token,
                    message: `Welcome back, ${user.username}!`
                });
            }
        );
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
});

module.exports = router;