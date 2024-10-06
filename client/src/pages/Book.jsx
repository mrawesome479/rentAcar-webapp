import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CarCard from '../components/CarCard';
import AlertBox from '../components/AlertBox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Book = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    carId: '',
    startDate: null,
    endDate: null,
    withDriver: false,
    pricePerDay: 0,
    totalPrice: 0,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Create a ref for the booking form section
  const bookingFormRef = useRef(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://rentacar-webapp.onrender.com/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars', error);
        setErrorMessage('Failed to fetch cars. Please try again later.');
      }
    };
    fetchCars();
  }, []);

  // Scroll to the booking form when carId is set
  useEffect(() => {
    if (bookingDetails.carId && bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [bookingDetails.carId]);

  const handleBookCar = (carId, pricePerDay) => {
    if (!user) {
      setShowAlert(true);
      return;
    }
    setBookingDetails({ ...bookingDetails, carId, pricePerDay });
  };

  const handleChange = (date, type) => {
    const newBookingDetails = {
      ...bookingDetails,
      [type]: date,
    };

    // Date validation and total price calculation logic (unchanged)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    if (newBookingDetails.startDate && newBookingDetails.startDate < today) {
      setErrorMessage('The start date cannot be in the past. Please select today or a future date.');
      return;
    }

    if (newBookingDetails.startDate && newBookingDetails.endDate && newBookingDetails.endDate < newBookingDetails.startDate) {
      setErrorMessage('The end date cannot be before the start date. Please select a valid date range.');
      return;
    }

    if (newBookingDetails.startDate && newBookingDetails.endDate && newBookingDetails.endDate >= newBookingDetails.startDate) {
      const timeDifference = newBookingDetails.endDate - newBookingDetails.startDate;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      let basePrice = daysDifference >= 0 ? daysDifference * newBookingDetails.pricePerDay : 0;

      if (newBookingDetails.withDriver) {
        basePrice += daysDifference >= 0 ? daysDifference * 20 : 0; // Add driver fee
      }

      newBookingDetails.totalPrice = basePrice;
    } else {
      newBookingDetails.totalPrice = 0;
    }

    setBookingDetails(newBookingDetails);
    setErrorMessage(''); // Clear error messages on valid input
  };

  const handleDriverChange = (e) => {
    const newWithDriver = e.target.checked;
    const newBookingDetails = { ...bookingDetails, withDriver: newWithDriver };

    if (newBookingDetails.startDate && newBookingDetails.endDate) {
      const timeDifference = newBookingDetails.endDate - newBookingDetails.startDate;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      let basePrice = daysDifference >= 0 ? daysDifference * newBookingDetails.pricePerDay : 0;

      if (newWithDriver) {
        basePrice += daysDifference >= 0 ? daysDifference * 20 : 0;
      }

      newBookingDetails.totalPrice = basePrice;
    }

    setBookingDetails(newBookingDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setErrorMessage('You must be logged in to book a car.');
      return;
    }

    // Date validation logic (unchanged)
    const selectedStartDate = new Date(bookingDetails.startDate);
    const selectedEndDate = new Date(bookingDetails.endDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedStartDate < today) {
      setErrorMessage('The start date cannot be in the past. Please select today or a future date.');
      return;
    }

    if (selectedEndDate < selectedStartDate) {
      setErrorMessage('The end date cannot be before the start date. Please select a valid date range.');
      return;
    }

    try {
      await axios.post('https://rentacar-webapp.onrender.com/api/bookings', {
        carId: bookingDetails.carId,
        startDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        withDriver: bookingDetails.withDriver,
        totalPrice: bookingDetails.totalPrice,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSuccessMessage('Car booked successfully!');
      setErrorMessage('');
      setBookingDetails({ carId: '', startDate: null, endDate: null, withDriver: false, pricePerDay: 0, totalPrice: 0 });
    } catch (error) {
      console.error('Error booking car', error);
      setErrorMessage('Error booking car. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Available Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.length === 0 ? (
          <p className="text-center">No cars available for booking at the moment.</p>
        ) : (
          cars.map((car) => (
            <CarCard 
              key={car._id} 
              car={car} 
              onBook={handleBookCar} 
            />
          ))
        )}
      </div>

      {user ? (
        bookingDetails.carId && (
          <form 
            ref={bookingFormRef} // Attach ref to booking form
            onSubmit={handleSubmit} 
            className="mt-8 bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            <div className="mb-4">
              <label className="block mb-1">Start Date:</label>
              <DatePicker 
                selected={bookingDetails.startDate} 
                onChange={(date) => handleChange(date, 'startDate')}
                className="border border-gray-600 bg-gray-700 text-white p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
                minDate={new Date()} // Prevent past dates
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">End Date:</label>
              <DatePicker 
                selected={bookingDetails.endDate} 
                onChange={(date) => handleChange(date, 'endDate')}
                className="border border-gray-600 bg-gray-700 text-white p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
                minDate={bookingDetails.startDate ? new Date(bookingDetails.startDate) : new Date()} 
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  name="withDriver" 
                  checked={bookingDetails.withDriver} 
                  onChange={handleDriverChange} 
                  className="mr-2" 
                />
                Book with Driver (+$20 per day)
              </label>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Total Price: ${bookingDetails.totalPrice}</p>
            </div>
            <button 
              type="submit" 
              className="bg-green-500 text-white p-2 rounded transition duration-300 hover:bg-green-600 w-full">
              Confirm Booking
            </button>
          </form>
        )
      ) : (
        <div className="mt-8 bg-red-700 p-4 rounded">
          <p className="text-white">Please log in to book a car.</p>
        </div>
      )}

      {successMessage && (
        <div className="mt-4 p-2 bg-green-700 text-white rounded">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 p-2 bg-red-700 text-white rounded">
          {errorMessage}
        </div>
      )}

      {showAlert && (
        <AlertBox 
          message="You need to log in to book a car." 
          onClose={handleCloseAlert} 
        />
      )}
    </div>
  );
};

export default Book;
