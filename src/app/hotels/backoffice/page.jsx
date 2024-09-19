"use client"
import HotelSideNav from '@/components/SideNavHotel';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiDish, BiFoodMenu } from "react-icons/bi";
import { FaWarehouse } from 'react-icons/fa6';
import { GoHistory, GoPersonAdd } from 'react-icons/go';
import { IoIosPeople } from 'react-icons/io';
import { MdOutlinePersonPin, MdOutlineTableRestaurant } from 'react-icons/md';
import { PiMoneyWavyFill } from 'react-icons/pi';

const EatofyApp = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index);

  };

  const [menuItems, setmenuItems] = useState(
    [
      {
        'name': 'Inventory Management',
        'href': '/hotels/inventory_management',
        'img_tag': FaWarehouse
      },
      {
        'name': 'Menu Management',
        'href': '/hotels/menu_management',
        'img_tag': BiFoodMenu
      },
      {
        'name': 'Staff Management',
        'href': '/hotels/staff',
        'img_tag': IoIosPeople
      },
      {
        'name': 'Table Management',
        'href': '/hotels/table_management',
        'img_tag': MdOutlineTableRestaurant
      },
      {
        'name': 'Customer Relationship Management',
        'href': '/hotels/crm',
        'img_tag': GoPersonAdd
      },
      {
        'name': 'Orders History',
        'href': '/hotels/order_history',
        'img_tag': GoHistory
      },
      {
        'name': 'Staff Attendance',
        'href': '/hotels/staff_attendance',
        'img_tag': MdOutlinePersonPin
      },
      {
        'name': 'Expense Management',
        'href': '/hotels/expence_tracking',
        'img_tag': PiMoneyWavyFill
      }
    ]
  )

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] h-screen flex items-center justify-center">
        <div className="w-screen h-screen bg-gray-200 px-6 rounded-lg shadow-lg" >
          <div className="flex justify-center items-center my-8">
            <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Backoffice</h2>
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
