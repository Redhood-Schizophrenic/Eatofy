'use client';

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useState } from 'react';

const Dashboard = () => {

  //Request Params
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Orders
  const [DineOrders, setDineOrders] = useState(0);
  const [TakeawayOrders, setTakeawayOrders] = useState(0);
  const [DeliveryOrders, setDeliveryOrders] = useState(0);

  // Amount
  const [TotalSales, setTotalSales] = useState(0);

  // Table
  const [Table, setTable] = useState([]);

  // Reassignment
  const [FullTable, setFullTable] = useState({});
  const [FullSales, setFullSales] = useState([]);


  const fetchAllOrders = async () => {
    if (from == "" || to == "") {
      alert("Please Select Filter");
    }
    try {

      const response = await fetch(`${ApiHost}/api/hotel/dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': sessionStorage.getItem('hotel_id'),
          'from': from,
          'to': to
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {

        // Orders
        setDineOrders(data.output.Orders.Dine_In);
        setTakeawayOrders(data.output.Orders.Takeaway);
        setDeliveryOrders(data.output.Orders.Delivery);

        // Amount
        setTotalSales(data.output.Amount.All_Order);


        // Employee
        setTable(data.output.Table.All);

        // Full Table
        setFullTable(data.output.Table);
        setFullSales(data.output.Amount);

      } else {
        console.log("Failed to fetch");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  console.log("Table", Table);

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-2xl uppercase font-bold pb-6">
              Sales Report
            </h1>
            <div className="flex items-center space-x-4">
              <div className='flex flex-col text-sm font-semibold text-zinc-700 items-center'>
                <label htmlFor="from">
                  From
                </label>
                <input
                  type="date"
                  id='from'
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value)
                  }}
                />
              </div>
              <div className='flex flex-col text-sm font-semibold text-zinc-700 items-center'>
                <label htmlFor="to">
                  To
                </label>
                <input
                  type="date"
                  id='to'
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value)
                  }}
                />
              </div>
              <div className='flex items-end pr-4 pt-6'>
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded-lg'
                  onClick={
                    () => {
                      fetchAllOrders();
                    }
                  }
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16 mb-4">
            <div
              className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500 cursor-pointer"
              onClick={() => {
                setTable(FullTable.Dine_In)
                setTotalSales(FullSales.Dine_In)
              }}
            >
              <h2 className="text-zinc-500">Dine-in Orders</h2>
              <p className="text-2xl font-bold">{DineOrders}</p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500 cursor-pointer"
              onClick={() => {
                setTable(FullTable.Takeaway)
                setTotalSales(FullSales.Takeaway)
              }}

            >
              <h2 className="text-zinc-500">Takeaway Orders</h2>
              <p className="text-2xl font-bold">{TakeawayOrders}</p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500 cursor-pointer"
              onClick={() => {
                setTable(FullTable.Delivery)
                setTotalSales(FullSales.Delivery)
              }}

            >
              <h2 className="text-zinc-500">Delivery Orders</h2>
              <p className="text-2xl font-bold">{DeliveryOrders}</p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500"
            >
              <h2 className="text-zinc-500">Total Sales</h2>
              <p className="text-2xl font-bold">₹ {TotalSales}</p>
            </div>
          </div>



          <div className='mt-[5dvh]'>
            <div className="bg-white p-4 rounded-lg shadow-md mt-5" >
              <h2 className="text-lg font-semibold text-card-foreground text-zinc-500">
                Sales Data
              </h2>
              <div className=' flex justify-center items-center'>

                <table className="min-w-full text-black border-collapse">
                  <thead>
                    <tr className="bg-gray-500 text-white font-bold">
                      <th className="border px-4 py-2">SR#</th>
                      <th className="border px-4 py-2">Date</th>
                      <th className="border px-4 py-2">Type</th>
                      <th className="border px-4 py-2">Waiter</th>
                      <th className="border px-4 py-2">Total Amount</th>
                      <th className="border px-4 py-2">Balance Amount</th>
                      <th className="border px-4 py-2">Payment Mode</th>
                      <th className="border px-4 py-2">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Table.length != 0 || Table[0] != null || Table[0] != undefined || Table != 0
                        ?
                        Table.map((row, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-zinc-100 text-black font-light" : "text-black font-light"}
                          >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{row.Date}</td>
                            <td className="border px-4 py-2">{row.Type}</td>
                            <td className="border px-4 py-2">{row.Waiter.FirstName} {row.Waiter.LastName}</td>
                            <td className="border px-4 py-2">{row.TotalAmount}</td>
                            <td className="border px-4 py-2">{row.BalanceAmount}</td>
                            <td className="border px-4 py-2">{row.PaymentMode}</td>
                            <td className="border px-4 py-2">{row.Status}</td>
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


export default Dashboard;