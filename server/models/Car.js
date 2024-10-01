import mongoose from 'mongoose'; // Ensure you import mongoose

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,  // Change to false if you want to allow entries without an image URL
  },
});

// Use export default to allow ES6 imports
const Car = mongoose.model('Car', carSchema);
export default Car;  // Export the Car model as default
