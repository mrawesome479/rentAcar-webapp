// Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import ReviewSection from '../components/ReviewSection'; // Import the ReviewSection


const Home = () => {
  return (
    <div>
      <Hero />
      <ReviewSection /> {/* Use the ReviewSection here */}
    </div>
  );
};

export default Home;
