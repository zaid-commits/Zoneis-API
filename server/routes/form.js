const express = require('express');
const router = express.Router();
const FormData = require('../Models/FormData.js'); 

// Handle form submission
router.post('/submit', async (req, res) => {
    try {
        const { name, age, email, address, subscription } = req.body;

        // Validate request payload
        if (!name || !age || !email || !address || !subscription) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new form data entry
        const newFormData = new FormData({
            name,
            age,
            email,
            address,
            subscription
        });

        // Save form data to database
        await newFormData.save();

        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all form data
router.get('/data', async (req, res) => {
    try {
        const formData = await FormData.find();
        res.json(formData);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;