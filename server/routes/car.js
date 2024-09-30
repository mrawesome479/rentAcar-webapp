import express from 'express';
import { getCars, addCar} from '../controllers/carController.js';

const router = express.Router();

// Route for getting all cars
router.get('/', getCars);

// Route for adding a new car with image upload
router.post('/', addCar); // Ensure uploadCarImage middleware is used here


export default router;
