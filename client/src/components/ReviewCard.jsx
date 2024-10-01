import React from 'react';

const ReviewCard = ({ image, name, review }) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg shadow-lg flex transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      <img src={image} alt={name} className="w-16 h-16 rounded-full border-2 border-gray-700 mr-4" />
      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-400 mt-2">{review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
