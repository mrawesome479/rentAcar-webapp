import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import AlertBox from '../components/AlertBox'; // Import the AlertBox component

const BookedCars = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [bookedCars, setBookedCars] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State for AlertBox visibility

  useEffect(() => {
    const fetchBookedCars = async () => {
      if (!user) return; // Don't fetch if there's no user

      try {
        // Fetch only bookings for the logged-in user
        const response = await axios.get(`http://localhost:5000/api/bookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the token in headers for auth
          },
        });
        setBookedCars(response.data);
      } catch (error) {
        console.error('Error fetching booked cars:', error);
        alert('Failed to fetch booked cars. Please try again later.'); // User-friendly error message
      }
    };

    fetchBookedCars();
  }, [user]); // Depend on user so it runs again when the user changes

  const openCancelModal = (bookingId) => {
    if (!user) {
      setShowAlert(true); // Show AlertBox if the user is not logged in
      return;
    }
    setSelectedBooking(bookingId);
    setIsModalOpen(true);
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    console.log('Cancelling booking with ID:', selectedBooking);

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${selectedBooking}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the token in headers for auth
        },
      });
      setBookedCars(bookedCars.filter(booking => booking._id !== selectedBooking)); 
      setIsModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('There was an error cancelling your booking. Please try again.');
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false); // Function to close the AlertBox
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Booked Cars</h1>

      {bookedCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {bookedCars.map((booking) => (
            <div key={booking._id} className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              {booking.carId && booking.carId.imageUrl && (
                <div className="relative h-48 mb-4 overflow-hidden">
                  <img 
                    src={booking.carId.imageUrl} 
                    alt={booking.carId.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="font-bold text-xl">{booking.carId?.name || 'Car Name Unavailable'}</h2>
              <p className="text-gray-300">Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
              <p className="text-gray-300">End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
              <p className="text-lg font-semibold">Total Price: ${booking.totalPrice}</p>
              <p className="text-gray-300">{booking.withDriver ? 'With Driver' : 'Without Driver'}</p>
              <button 
                onClick={() => openCancelModal(booking._id)} 
                className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-300">
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-center">You have not booked any cars yet.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition duration-300">
                Cancel
              </button>
              <button 
                onClick={handleCancelBooking} 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <AlertBox 
          message="You need to log in to cancel a booking." 
          onClose={handleCloseAlert} 
        />
      )}
    </div>
  );
};

export default BookedCars;
