import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  // Function to handle navigation to About page and scroll to top
  const handleNavigateToAbout = () => {
    navigate('/about'); // Navigate to the About page
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <footer className="p-8 bg-black text-gray-300">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/CarRentHubLogo.png" alt="Company Logo" className="w-24 mb-4" /> {/* Replace with your logo */}
          <p className="text-sm text-center md:text-left">© 2024 Car Rental. All Rights Reserved.</p>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-6">
            <a
              href="#"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="#"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="#"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-end">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-center md:text-right">
            <li>
              {/* Use the custom function to handle navigation */}
              <button onClick={handleNavigateToAbout} className="hover:text-blue-300">
                About Us
              </button>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-300">Contact Us</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-300">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Powered By */}
      <div className="text-center mt-8">
        <p className="text-sm">Powered by CarRental</p>
      </div>
    </footer>
  );
};

export default Footer;
