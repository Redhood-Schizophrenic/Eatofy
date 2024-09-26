'use client';

import HotelSideNav from "@/components/SideNavHotel";
import Link from "next/link";
import { useState } from "react";
import { BsBox2, BsPersonBoundingBox } from "react-icons/bs";
import { GoContainer } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";

export default function Inventory() {

  const [activeIndex, setActiveIndex] = useState(null);

  const [ menuItems, setItems ] = useState([
    {
      'id': '1',
      'href': '/hotels/purchase_management',
      'name': 'Purchase Management',
      'img_tag': IoCartOutline

    },
    {
      'id': '2',
      'href': '/hotels/item_management',
      'name': 'Items Management',
      'img_tag': BsBox2

    },
    {
      'id': '3',
      'href': '/hotels/available_stock',
      'name': 'Available Stock',
      'img_tag': GoContainer

    },
    {
      'id': '4',
      'href': '/hotels/backoffice/supplier_management',
      'name': 'Supplier Management',
      'img_tag': BsPersonBoundingBox

    }
  ]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] h-screen flex items-center justify-center">
        <div className="w-screen h-screen px-6 bg-gray-200 rounded-lg shadow-lg">
          <div className="flex justify-center items-center my-8">
            <h2 className="w-full text-center pt-4 bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Inventory Management</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {menuItems.map((item, index) => (
              <Link
                href={item.href}
                key={item.id}
                className={`border-l-4 w-[20dvw] rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer ${activeIndex === index ? 'bg-red-500 text-white' : 'bg-white text-zinc-700 border-red-500'
                  }`}
                onClick={() => handleItemClick(index)}
              >
                <item.img_tag
                  className="w-10 h-10 mb-2 text-gray-700"
                />
                <span className="font-semibold">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
