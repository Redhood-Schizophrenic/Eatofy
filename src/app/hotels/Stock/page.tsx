"use client";
import HotelSideNav from '@/components/SideNavHotel';
import React from 'react';

const StockAdd: React.FC = () => {
  return (
    <>
      <HotelSideNav />
      <div className="ml-[60px] flex-1 p-6 bg-white h-screen text-black">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Daily <span className="text-red-500">Stock</span>
          </h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded mt-4 md:mt-0">Stock Add +</button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <label className="block text-zinc-500">Data Range</label>
            <span>Last 30 Days</span>
          </div>
          <div className="mb-4 md:mb-0">
            <label className="block text-zinc-500">Filter</label>
            <input
              type="text"
              className="border-b-2 border-zinc-300 focus:outline-none focus:border-black"
            />
          </div>
          <img src="https://placehold.co/24x24" alt="settings" className="w-6 h-6" />
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Time</th>
              <th className="text-left p-2">Branch</th>
              <th className="text-left p-2">User</th>
              <th className="text-left p-2">Inventory Sync</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full">Completed</span>
              </td>
              <td className="p-2">4:50 PM</td>
              <td className="p-2">----------</td>
              <td className="p-2">Purva Mhatre</td>
              <td className="p-2">----------</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full">Pending</span>
              </td>
              <td className="p-2">6:15 PM</td>
              <td className="p-2">----------</td>
              <td className="p-2">Himanshi Kamble</td>
              <td className="p-2">----------</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full">Completed</span>
              </td>
              <td className="p-2">7:25 PM</td>
              <td className="p-2">----------</td>
              <td className="p-2">Sakshi Umbare</td>
              <td className="p-2">----------</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full">Completed</span>
              </td>
              <td className="p-2">8:01 PM</td>
              <td className="p-2">----------</td>
              <td className="p-2">Chaturya Sulakhe</td>
              <td className="p-2">----------</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full">Completed</span>
              </td>
              <td className="p-2">9:20 PM</td>
              <td className="p-2">----------</td>
              <td className="p-2">Pratham More</td>
              <td className="p-2">----------</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StockAdd;
