import React from 'react';
import ReviewCard from './ReviewCard'; // Import your ReviewCard component
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: "John Doe",
    review: "Amazing service! Highly recommend for luxury car rentals.",
    image: avatar1, // Replace with your actual image path
  },
  {
    id: 2,
    name: "Jane Smith",
    review: "Best experience I ever had! Will rent again.",
    image: avatar2, // Replace with your actual image path
  },
  {
    id: 3,
    name: "Mike Johnson",
    review: "Affordable rates and excellent cars.",
    image: avatar3, // Replace with your actual image path
  },
];

const ReviewSection = () => {
  return (
    <section className="py-10 bg-black text-gray-300">
      <h2 className="text-3xl font-bold text-center mb-6">What Our Customers Say</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <ReviewCard 
            key={review.id}
            image={review.image}
            name={review.name}
            review={review.review}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
