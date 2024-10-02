import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

const Footer = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  // Function to handle navigation to Home and scroll to the top
  const handleNavigateToHome = () => {
    window.scrollTo(0, 0); // Scroll to the top
    navigate('/'); // Navigate to the home page
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
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="#"
              target="_blank"
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
              {/* Use onClick to handle navigation to Home */}
              <Link to="/about" className="hover:text-blue-300">About Us</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-300" onClick={handleNavigateToHome}>Contact Us</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-300" onClick={handleNavigateToHome}>Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Powered By */}
      <div className="text-center mt-8">
        <p className="text-sm">Powered by Car Rental Services</p>
      </div>
    </footer>
  );
};

export default Footer;
