"use client"

import React, { useState } from 'react';

const EatofyApp: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  const menuItems = [
    'KOT Setup',
    'Meal Scheduling',
    'Role Management',
    'Outlet Details',
    'Payment Modes',
    'Pickup Setup',
    'Reference Scheme',
    'UPI Setting',
    'Eatofy Dashboard',
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
        
      <div className="w-screen h-screen p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-red-500 text-2xl font-bold">EATOFY</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for food, coffee, etc..."
              className="pl-10 pr-4 py-2 rounded-full border border-zinc-300 focus:outline-none text-black focus:border-zinc-500"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14A6 6 0 108 2a6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`p-4 rounded-full flex justify-between items-center cursor-pointer border ${
                activeIndex === index ? 'bg-red-500 text-white' : 'bg-white text-zinc-700 border-zinc-300'
              }`}
              onClick={() => handleItemClick(index)}
            >
              <span>{item}</span>
              {item === 'KOT Setup' && (
                <img
                
                 
                 
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EatofyApp;
