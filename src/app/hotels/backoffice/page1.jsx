"use client"
import HotelSideNav from '@/components/SideNavHotel';
import Link from 'next/link';
import React, { useState } from 'react';

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
      },
      {
        'name': 'Menu Management',
        'href': '/hotels/menu_management',
      },
      {
        'name': 'Staff Management',
        'href': '/hotels/staff',
      },
      {
        'name': 'Table Management',
        'href': '/hotels/table_management',
      },
      {
        'name': 'Customer Relationship Management',
        'href': '/hotels/crm',
      },
      {
        'name': 'Orders History',
        'href': '/hotels/order_history',
      },
      {
        'name': 'Staff Attendance',
        'href': '/hotels/staff_attendance',
      },
      {
        'name': 'Expense Management',
        'href': '/hotels/expence_tracking',
      }
    ]
  )

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] h-screen flex items-center justify-center bg-gray-100">
        <div className="w-screen h-screen px-6 bg-white rounded-lg shadow-lg" >
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
