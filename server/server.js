const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet'); // Security middleware
const compression = require('compression'); // Compression middleware
const path = require('path');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form'); // Import form routes
const errorHandler = require('./middleware/errorHandler'); // Import error handler

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for your frontend URL
app.use(cors({
    origin: 'https://zoneis.vercel.app',
    optionsSuccessStatus: 200
}));

// Security middleware
app.use(helmet());

// Compression middleware
app.use(compression());

console.log('MongoDB URI:', process.env.MONGO_URI);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes); // Use form routes

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Authentication API');
});

// Use the error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});