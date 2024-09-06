'use client';

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useEffect, useState } from 'react';

const Customer_Report = () => {

  // // For A Week before
  // const today = new Date();
  // const weekbefore = new Date(today);
  // weekbefore.setDate(today.getDate() - 1);
  // const from_default = weekbefore.toISOString().split('T')[0];
  // const to_default = today.toISOString().split('T')[0];
  //
  // //Request Params
  // const [from, setFrom] = useState(from_default);
  // const [to, setTo] = useState(to_default);

  // Table
  const [Table, setTable] = useState([]);

  // Search 
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllCustomers = async () => {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/customers/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': sessionStorage.getItem('hotel_id'),
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {

        // Employee
        setTable(data.output);

      } else {
        alert("Failed to fetch");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTable = Table.filter((bill) =>
    bill?.CustomerName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill?.Contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold pb-6">
              Customer Report
            </h1>
          </div>

          <div className="w-full flex justify-between">
            <div className='w-1/2 flex justify-end items-end'>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Customer Name or Contact..."
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
          </div>

          <div className='mt-[5dvh]'>
            <div className="bg-white p-4 rounded-lg shadow-md mt-5 border-l-4 border-red-500" >
              <h2 className="text-lg font-semibold text-card-foreground text-zinc-500 pb-4">
                Customer Data
              </h2>
              <div className=' flex justify-center items-center'>
                <table className="min-w-full text-black border-collapse">
                  <thead>
                    <tr className="bg-gray-500 text-white font-bold">
                      <th className="border px-4 py-2">SR#</th>
                      <th className="border px-4 py-2">Customer Name</th>
                      <th className="border px-4 py-2">Contact</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Occassion</th>
                      <th className="border px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filteredTable.length != 0 || filteredTable[0] != null || filteredTable[0] != undefined || filteredTable != 0
                        ?
                        filteredTable.map((row, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-zinc-100 text-black font-light" : "text-black font-light"}
                          >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{row.CustomerName}</td>
                            <td className="border px-4 py-2">{row.Contact}</td>
                            <td className="border px-4 py-2">{row.Email}</td>
                            <td className="border px-4 py-2">{row.CustomerOccassion[0]?.Occassion || "N/A"}</td>
                            <td className="border px-4 py-2">{row.CustomerOccassion[0]?.Date || "N/A"}</td>
                          </tr>
                        ))
                        : null
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default Customer_Report;
