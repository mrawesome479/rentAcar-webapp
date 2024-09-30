import React from 'react';
import { Link } from 'react-router-dom';
import car2Image from '../assets/car2.jpg'; // Adjust the path if needed
import ReviewCard from './ReviewCard'; // Import the ReviewCard component

const Hero = () => {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center bg-black">
        {/* Background Image with Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${car2Image})`,
            opacity: 0.5, // Adjust opacity to your liking
          }}
        />

        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 relative z-10">
          {/* Text Section */}
          <div className="text-left lg:w-1/2">
            <h1 className="text-6xl font-extrabold text-white mb-6 leading-tight">
              Experience the Thrill of <span className="text-blue-500">Luxury Cars</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Discover a premium car rental experience. Choose from a wide range of luxury and affordable vehicles for your next journey.
            </p>
            <Link to="/book" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded transition duration-300 ease-in-out shadow-lg">
              Explore Our Fleet
            </Link>
          </div>
        </div>

        {/* Dark Background Shape */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Review Section */}
     
    </>
  );
};

export default Hero;
