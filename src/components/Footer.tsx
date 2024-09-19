import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black w-full h-auto md:h-[65dvh] text-white p-10 py-12 flex flex-col justify-between gap-8">
      <div className="container w-[80dvw] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2 sm:mb-4">About Us</h3>
          <p className="text-sm sm:text-base py-4 lg:pr-8">
            We are dedicated to providing the best restaurant management solutions to streamline your operations and enhance your customer experience.
          </p>
          <div className="flex gap-4 my-4">
            <Link href="#" className="w-[40px] h-[40px] rounded-full bg-gray-500 bg-opacity-30 inline-grid place-items-center"><FaFacebookF size={20} color='#fff'/></Link>
            <Link href="#" className="w-[40px] h-[40px] rounded-full bg-gray-500 bg-opacity-30 inline-grid place-items-center"><FaTwitter size={20} color='#fff'/></Link>
            <Link href="#" className="w-[40px] h-[40px] rounded-full bg-gray-500 bg-opacity-30 inline-grid place-items-center"><FaInstagram size={20} color='#fff'/></Link>
          </div>
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
            <li>Phone: +91 84199-99929</li>
            <li>Address: 123 Restaurant St, Food City, FC 12345</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-6 sm:mt-8 text-white text-sm">
        © 2024 Eatofy. All rights reserved.<br/>Developed by Appniche Technologies
      </div>
    </footer>
  );
};

export default Footer;
