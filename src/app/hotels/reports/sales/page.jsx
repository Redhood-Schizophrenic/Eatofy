'use client';

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useEffect, useState } from 'react';

const Sales_Report = () => {

  // For A Week before
  const today = new Date();
  const weekbefore = new Date(today);
  weekbefore.setDate(today.getDate() - 1);
  const from_default = weekbefore.toISOString().split('T')[0];
  const to_default = today.toISOString().split('T')[0];

  //Request Params
  const [from, setFrom] = useState(from_default);
  const [to, setTo] = useState(to_default);

  // Full Data
  const [FullTable, setFullTable] = useState({
    Dine_In: [],
    Takeaway: [],
    Delivery: []
  });
  const [FullSales, setFullSales] = useState({
    Dine_In: 0,
    Takeaway: 0,
    Delivery: 0
  });

  // Filtered Table Data
  const [Table, setTable] = useState([]);
  const [TotalSales, setTotalSales] = useState(0);

  // Payment Status Tables
  const [PaidTable, setPaidTable] = useState([]);
  const [UnpaidTable, setUnpaidTable] = useState([]);
  const [PartPaidTable, setPartPaidTable] = useState([]);

  // Search 
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllOrders = async () => {
    if (from === "" || to === "") {
      alert("Please Select Filter");
      return;
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
        // Full Table and Sales Data
        setFullTable(data.output.Table);
        setFullSales(data.output.Amount);

        // Set initial table and sales data to Dine_In
        setTable(data.output.Table.Dine_In);
        setTotalSales(data.output.Amount.Dine_In);

        // Separate tables by payment status
        setPaidTable([
          ...data.output.Table?.All,
        ].filter(bill => bill.Status.toLowerCase() === 'paid'));

        setUnpaidTable([
          ...data.output.Table?.All,
        ].filter(bill => bill.Status.toLowerCase() === 'unpaid'));

        setPartPaidTable([
          ...data.output.Table?.All,
        ].filter(bill => bill.Status.toLowerCase() === 'partpaid'));

      } else {
        alert("Failed to fetch");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTable = Table.filter((bill) =>
    bill.Table?.TableName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.Waiter.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.Waiter.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.Customer?.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.Status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold pb-6">
              Sales Report
            </h1>
          </div>

          <div className="w-full flex justify-between">
            <div className="flex items-center space-x-4">
              <div className='flex flex-col text-sm font-semibold text-zinc-700 items-center'>
                <label htmlFor="from">From</label>
                <input
                  type="date"
                  id='from'
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className='flex flex-col text-sm font-semibold text-zinc-700 items-center'>
                <label htmlFor="to">To</label>
                <input
                  type="date"
                  id='to'
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <div className='flex items-end pr-4 pt-6'>
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded-lg'
                  onClick={fetchAllOrders}
                >
                  Filter
                </button>
              </div>
            </div>
            <div className='w-1/2 flex justify-end items-end'>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Table, Waiter, Payment Status or Customer..."
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 mb-4">
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 cursor-pointer"
              onClick={() => {
                setTable(FullTable.Dine_In);
                setTotalSales(FullSales.Dine_In);
              }}
            >
              <h2 className="text-zinc-500">Dine-in Orders</h2>
              <p className="text-2xl font-bold">{FullTable.Dine_In.length}</p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 cursor-pointer"
              onClick={() => {
                setTable(FullTable.Takeaway);
                setTotalSales(FullSales.Takeaway);
              }}
            >
              <h2 className="text-zinc-500">Takeaway Orders</h2>
              <p className="text-2xl font-bold">{FullTable.Takeaway.length}</p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 cursor-pointer"
              onClick={() => {
                setTable(FullTable.Delivery);
                setTotalSales(FullSales.Delivery);
              }}
            >
              <h2 className="text-zinc-500">Delivery Orders</h2>
              <p className="text-2xl font-bold">{FullTable.Delivery.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
              <h2 className="text-zinc-500">Total Sales</h2>
              <p className="text-2xl font-bold">₹ {TotalSales}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-4">
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 cursor-pointer"
              onClick={() => {
                setTable(PaidTable);
                setTotalSales(PaidTable.reduce((sum, bill) => sum + bill.TotalAmount, 0));
              }}
            >
              <h2 className="text-zinc-500">Paid Bills</h2>
              <p className="text-2xl font-bold">{PaidTable.length}</p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 cursor-pointer"
              onClick={() => {
                setTable(UnpaidTable);
                setTotalSales(UnpaidTable.reduce((sum, bill) => sum + bill.TotalAmount, 0));
              }}
            >
              <h2 className="text-zinc-500">Unpaid Bills</h2>
              <p className="text-2xl font-bold">{UnpaidTable.length}</p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500 cursor-pointer"
              onClick={() => {
                setTable(PartPaidTable);
                setTotalSales(PartPaidTable.reduce((sum, bill) => sum + bill.TotalAmount, 0));
              }}
            >
              <h2 className="text-zinc-500">Part-Paid Bills</h2>
              <p className="text-2xl font-bold">{PartPaidTable.length}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full bg-white shadow-md rounded-lg border-l-4 border-red-500">
              <h2 className="text-lg font-semibold text-card-foreground text-zinc-500 px-4 pt-4">
                Sales Data
              </h2>

              <div className="p-4">
                <table className="min-w-full text-black border-collapse">
                  <thead>
                    <tr className="bg-gray-500 text-white font-bold">
                      <th className="border px-4 py-2">SR#</th>
                      <th className="border px-4 py-2">Date</th>
                      <th className="border px-4 py-2">Type</th>
                      <th className="border px-4 py-2">Waiter</th>
                      <th className="border px-4 py-2">Customer Name</th>
                      <th className="border px-4 py-2">Customer Contact</th>
                      <th className="border px-4 py-2">Total Amount</th>
                      <th className="border px-4 py-2">Balance Amount</th>
                      <th className="border px-4 py-2">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTable.length > 0 ? (
                      filteredTable.map((row, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-zinc-100 text-black font-light text-center text-sm" : "text-center text-black font-light text-sm"}
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{row.Date}</td>
                          <td className="border px-4 py-2">{row.Type}</td>
                          <td className="border px-4 py-2">{row.Waiter.FirstName} {row.Waiter.LastName}</td>
                          <td className="border px-4 py-2">{row.Customer?.CustomerName || "N/A" }</td>
                          <td className="border px-4 py-2">{row.Customer?.Contact || "N/A"}</td>
                          <td className="border px-4 py-2">{row.TotalAmount}</td>
                          <td className="border px-4 py-2">{row.BalanceAmount}</td>
                          <td className="border px-4 py-2">
                            <span
                              className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                                  row.Status.toLowerCase() === 'paid' ? 'bg-green-100 text-green-800' :
                                  row.Status.toLowerCase() === 'unpaid' ? 'bg-red-100 text-red-800' : 
                                  row.Status.toLowerCase() === 'partpaid' ? 'bg-yellow-100 text-yellow-800':
                                  'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {row.Status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="border px-4 py-2 text-center" colSpan="8">No Orders Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales_Report;
