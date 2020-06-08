const express = require('express');
const connectDB = require('./config/db');
const globalErrorHandler = require('./errors/globalErrorHandler');

// Start Server
const app = express();

// Middlewares
app.use(express.json({ extended: false }));

// Connect Database
connectDB();

// Define Routes
app.use('/api/profile', require('./routes/api/profileRoutes'));
app.use('/api/auth', require('./routes/api/authRoutes'));
app.use('/api/collabs', require('./routes/api/collabsRoutes'));

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
