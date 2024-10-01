import Booking from '../models/Booking.js'; // Ensure you have a Booking model

// Controller for adding a new booking
export const addBooking = async (req, res) => {
    const { carId, startDate, endDate, withDriver, totalPrice } = req.body;

    // Validate input
    if (!carId || !startDate || !endDate || typeof withDriver !== 'boolean' || totalPrice === undefined) {
        return res.status(400).json({ message: 'All fields are required and must be valid.' });
    }

    try {
        // Create a new booking with userId
        const newBooking = new Booking({
            userId: req.user.id, // Access user ID from req.user
            carId,
            startDate,
            endDate,
            withDriver,
            totalPrice,
        });

        const savedBooking = await newBooking.save(); // Save the booking
        res.status(201).json({ message: 'Booking successful', booking: savedBooking });
    } catch (error) {
        console.error('Error saving booking:', error.message);
        res.status(500).json({ message: 'Error booking car', error: error.message });
    }
};

// Controller for fetching all bookings
export const getBookings = async (req, res) => {
    try {
        // Fetch only the bookings that belong to the authenticated user
        const bookings = await Booking.find({ userId: req.user.id }) // This line should work if req.user.id is set correctly
            .populate('carId'); // Use .populate() to get car details if necessary
        res.status(200).json(bookings); // Send bookings as JSON response
    } catch (error) {
        console.error('Error fetching bookings:', error.message); // Log the error message
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

// Controller for canceling a booking
export const cancelBooking = async (req, res) => {
    const { id } = req.params; // Get the booking ID from request parameters
  
    try {
        // Check if the booking belongs to the authenticated user before deleting
        const booking = await Booking.findOneAndDelete({ _id: id, userId: req.user.id }); // Find and delete the booking only if it belongs to the user
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found or you do not have permission to cancel this booking.' });
        }
        res.status(200).json({ message: 'Booking cancelled successfully' }); // Successful deletion
    } catch (error) {
        console.error('Error cancelling booking:', error.message);
        res.status(500).json({ message: 'Error cancelling booking', error });
    }
};
