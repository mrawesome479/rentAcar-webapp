import express from 'express';
import { addBooking, getBookings, cancelBooking } from '../controllers/bookingController.js'; 
import authenticateToken from '../middleware/authenticateToken.js'; // Import your authentication middleware

const router = express.Router();

// Route for adding a new booking (POST request)
router.post('/', authenticateToken, addBooking); // Ensure only authenticated users can add bookings

// Route for fetching all bookings for the logged-in user (GET request)
router.get('/', authenticateToken, getBookings); // Secure this route with authentication

// Route for canceling a booking (DELETE request)
router.delete('/:id', authenticateToken, cancelBooking); // Secure this route as well

export default router;
