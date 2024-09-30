import Car from '../models/Car.js'; // Assuming you have a Car model

// Get all cars
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars', error });
  }
};

// Add a new car
export const addCar = async (req, res) => {
  const { name, description, price, imageUrl } = req.body; // Include imageUrl in the request body

  try {
    const newCar = new Car({
      name,
      description,
      price,
      imageUrl,  // Save the imageUrl in the new car entry
    });

    await newCar.save();
    res.status(201).json({ message: 'Car added successfully!', car: newCar });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add car', error });
  }
};
