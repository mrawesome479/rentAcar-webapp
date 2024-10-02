import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // FontAwesome social media icons

const Footer = () => {
  return (
    <footer className="p-8 bg-black text-gray-300">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/CarRentalHubLogo.png" alt="Company Logo" className="w-24 mb-4" /> {/* Replace with your logo */}
          <p className="text-sm text-center md:text-left">© 2024 Car Rental. All Rights Reserved.</p>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Quick Links or Contact */}
        <div className="flex flex-col items-center md:items-end">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-center md:text-right">
            <li>
              <a href="/about" className="hover:text-blue-300">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-300">Contact Us</a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-300">Privacy Policy</a>
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
