// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    withDriver: { type: Boolean, required: true },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
