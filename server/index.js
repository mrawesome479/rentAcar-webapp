import express from 'express';
import mongoose from 'mongoose';
import carRoutes from './routes/car.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bookingRoutes from './routes/booking.js';
import authRoutes from './routes/authRoutes.js'; 
import  authenticateToken  from './middleware/authenticateToken.js'; // Import your authentication middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Content Security Policy (CSP)
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self' http://localhost:5000 http://localhost:5173; img-src 'self' data:;");
    next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes); // Add the auth routes here

// Protect the booking routes
app.use('/api/bookings', authenticateToken, bookingRoutes); // Apply middleware to booking routes

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
