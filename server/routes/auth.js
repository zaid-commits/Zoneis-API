const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User= require('../models/User.js');
const router = express.Router();


// Register a new User
router.post('/register', [
    check('Username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { Username, email, password } = req.body;

    try {
        let User = await User.findOne({ email });

        if (User) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        User = new User({
            Username,
            email,
            password // Store plain text password for debugging
        });

        const salt = await bcrypt.genSalt(10);
        User.password = await bcrypt.hash(password, salt);

        await User.save();

        const payload = {
            User: {
                id: User.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, message: 'Registration successful!' });
            }
        );
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
});

// Login a User
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let User = await User.findOne({ email });

        if (!User) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, User.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            User: {
                id: User.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    token,
                    message: `Welcome back, ${User.Username}!` // Add welcome message
                });
            }
        );
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
});

module.exports = router;