import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 flex flex-col items-center">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="mt-2 text-lg leading-relaxed text-gray-300">
          We are a leading car rental service providing affordable and reliable vehicles for your travel needs. 
          Our mission is to ensure you have a seamless and enjoyable experience, whether you're exploring a new city or simply in need of a reliable mode of transportation.
        </p>

        <div className="bg-gray-800 rounded-lg p-6 mt-8 shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-5">
            <li className="mt-2">✅ Wide range of vehicles</li>
            <li className="mt-2">✅ Competitive pricing</li>
            <li className="mt-2">✅ Exceptional customer service</li>
            <li className="mt-2">✅ Flexible rental terms</li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-gray-300">
            We are committed to providing the best car rental service in the industry. Your satisfaction is our top priority.
          </p>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-300">Have questions? Reach out to us for assistance!</p>
          <p className="mt-2">📞 Phone: +123 456 7890</p>
          <p className="mt-1">✉️ Email: info@carrentalservice.com</p>
        </div>
      </div>
    </div>
  );
};

export default About;
