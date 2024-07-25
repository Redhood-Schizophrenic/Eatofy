"use client"
import HotelSideNav from '@/components/SideNavHotel';
import Link from 'next/link';
import React, { useState } from 'react';
import { FcSalesPerformance } from "react-icons/fc";
import { BiPurchaseTag } from "react-icons/bi";
import { GiExpense } from "react-icons/gi";

const EatofyApp = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index);

  };

  const menuItems = [
    {
      'name': 'Sales Report',
      'href': '/hotels/reports/sales',
      'img_tag': FcSalesPerformance
    },
    {
      'name': 'Purchases Report',
      'href': '/hotels/reports/purchases',
      'img_tag': BiPurchaseTag
    },
    {
      'name': 'Expenses Repot',
      'href': '/hotels/reports/expenses',
      'img_tag': GiExpense
    }
  ];

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] h-screen flex items-center justify-center bg-gray-100">
        <div className="w-screen h-screen px-6 bg-white rounded-lg shadow-lg" >
          <div className="flex justify-center items-center my-8">
            <h1 className="text-red-500 text-2xl font-bold"> Reports </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={`border rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer ${activeIndex === index ? 'bg-red-500 text-white' : 'bg-white text-zinc-700 border-red-500'
                  }`}
                onClick={() => handleItemClick(index)}
              >
                <item.img_tag
                  className="w-10 h-10 mb-2 text-gray-700"
                />
                <span className='font-semibold'>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EatofyApp;
