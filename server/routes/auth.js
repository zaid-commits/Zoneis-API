const express = require('express');
const router = express.Router();
const User= require('../Models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
    try {
        const { Username, email, password } = req.body;

        if (!Username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // new User
        const newUser = new User({
            Username,
            email,
            password: hashedPassword
        });

        // Save User to database
        await newUser.save();

        // new JWT token login
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
        const User = await User.findOne({ email });
        if (!User) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = { UserId: User._id };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    token,
                    message: `Welcome back, ${User.Username}!`
                });
            }
        );
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
});

module.exports = router;