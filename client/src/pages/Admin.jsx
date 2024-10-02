import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [car, setCar] = useState({ name: '', description: '', price: '', imageUrl: '' }); // Added imageUrl
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send car data to the server
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cars`, car); // Send car object directly

      setSuccessMessage('Car added successfully!');
      setErrorMessage(''); // Clear previous error messages
      setCar({ name: '', description: '', price: '', imageUrl: '' }); // Reset form
    } catch (error) {
      console.error('Error adding car', error);
      setErrorMessage('Error adding car. Please try again.');
      setSuccessMessage(''); // Clear previous success messages
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Car</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={car.name}
            onChange={handleChange}
            placeholder="Car Name"
            className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
            required
          />
          <input
            type="text"
            name="description"
            value={car.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={car.price}
            onChange={handleChange}
            placeholder="Price per Day"
            className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
            required
          />
          <input
            type="text"
            name="imageUrl" // New input for image URL
            value={car.imageUrl} // Set the imageUrl in the car state
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-300"
          >
            Add Car
          </button>
        </form>

        {/* Display success and error messages */}
        {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4 text-center">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Admin;
