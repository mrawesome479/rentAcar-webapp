import axios from 'axios';

const API_URL = '/api/cars';

export const getCars = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add more functions for booking and fetching booked cars as needed
