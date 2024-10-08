const express = require('express');
const { check, validationResult } = require('express-validator');
const FormData = require('../Models/formData.js'); // Ensure the path is correct
const router = express.Router();

// Handle form submission
router.post('/submit', [
    check('name', 'Name is required').not().isEmpty(),
    check('age', 'Age is required').isInt({ min: 1 }),
    check('email', 'Please include a valid email').isEmail(),
    check('address', 'Address is required').not().isEmpty(),
    check('subscription', 'Subscription is required').isIn(['Basic', 'Prime', 'Elite']),
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, age, email, address, subscription } = req.body;

    try {
        const formData = new FormData({
            name,
            age,
            email,
            address,
            subscription
        });

        await formData.save();
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (err) {
        next(err); // Pass errors to the error handler
    }
});

module.exports = router;