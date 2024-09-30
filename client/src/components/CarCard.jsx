const CarCard = ({ car, onBook }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="relative h-48 overflow-hidden rounded-lg"> {/* Added wrapper for image */}
        <img 
          src={car.imageUrl} 
          alt={car.name} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
      </div>
      <h3 className="text-xl font-bold mt-2">{car.name}</h3>
      <p className="text-gray-400">{car.description}</p>
      <p className="text-lg font-semibold mt-2">Price: ${car.price} per day</p>
      <button 
        onClick={() => onBook(car._id, car.price)} 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-blue-600 w-full"
      >
        Book Now
      </button>
    </div>
  );
};

export default CarCard;
