import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <form className="mt-4">
        <input type="text" placeholder="Your Name" className="border p-2 w-full mb-2" required />
        <input type="email" placeholder="Your Email" className="border p-2 w-full mb-2" required />
        <textarea placeholder="Your Message" className="border p-2 w-full mb-2" rows="4" required></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
