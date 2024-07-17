import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-500 w-full text-white p-10 py-12 rounded-xl">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2 sm:mb-4">About Us</h3>
          <p className="text-sm sm:text-base">
            We are dedicated to providing the best restaurant management solutions to streamline your operations and enhance your customer experience.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 sm:mb-4">Services</h3>
          <ul className="text-sm sm:text-base space-y-2 sm:space-y-4">
            <li>Order Management</li>
            <li>Inventory Management</li>
            <li>Video Marketing</li>
            <li>Staff Salary Management</li>
          </ul>
        </div>
        <div id="contact us">
          <h3 className="text-lg font-bold mb-2 sm:mb-4">Contact Us</h3>
          <ul className="text-sm sm:text-base space-y-2 sm:space-y-4">
            <li>Email: support@eatofy.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Restaurant St, Food City, FC 12345</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 sm:mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white">Facebook</a>
            <a href="#" className="text-white">Twitter</a>
            <a href="#" className="text-white">Instagram</a>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 sm:mt-8 text-white text-sm">
        © 2024 Eatofy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
