const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
console.log('MongoDB URI:', mongoURI);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Authentication API');
});

// Use the error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});