"use client"
import HotelSideNav from '@/components/SideNavHotel';
import Link from 'next/link';
import React, { useState } from 'react';
import { FcSalesPerformance } from "react-icons/fc";
import { BiPurchaseTag } from "react-icons/bi";
import { GiExpense } from "react-icons/gi";
import { MdOutlineInventory2, MdPeopleAlt } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';
import { FaBoxOpen } from 'react-icons/fa6';
import { RiMoneyRupeeCircleFill } from 'react-icons/ri';

const EatofyApp = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index);

  };

  const [menuItems, setMenuItems] = useState([
    {
      'name': 'Financial Report',
      'href': '/hotels/reports/financial',
      'img_tag': RiMoneyRupeeCircleFill
    },
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
      'name': 'Expenses Report',
      'href': '/hotels/reports/expenses',
      'img_tag': GiExpense
    },
    {
      'name': 'Staff Report',
      'href': '/hotels/reports/staff',
      'img_tag': MdPeopleAlt
    },
    {
      'name': 'Customer Report',
      'href': '/hotels/reports/customer',
      'img_tag': IoIosPeople
    },
    {
      'name': 'Supplier Report',
      'href': '/hotels/reports/supplier',
      'img_tag': FaBoxOpen
    }, 
    {
      'name': 'Inventory Report',
      'href': '/hotels/reports/inventory',
      'img_tag': MdOutlineInventory2
    },
  ]);

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] h-screen flex items-center justify-center">
        <div className="w-screen h-screen px-6 rounded-lg shadow-lg bg-gray-200" >
          <div className="flex justify-center items-center my-8">
            <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Reports</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={`border-l-4 rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer ${activeIndex === index ? 'bg-red-500 text-white' : 'bg-white text-zinc-700 border-red-500'
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
