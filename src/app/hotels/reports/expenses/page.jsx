'use client';

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';
import { FaWallet } from 'react-icons/fa6';

const Expenses_Report = () => {

  // For A Week before
  const today = new Date();
  const weekbefore = new Date(today);
  weekbefore.setDate(today.getDate() - 1);
  const from_default = weekbefore.toISOString().split('T')[0];
  const to_default = today.toISOString().split('T')[0];

  //Request Params
  const [from, setFrom] = useState(from_default);
  const [to, setTo] = useState(to_default);

  // Expense-Wise
  const [Data, setData] = useState({});
  const [Count, setCount] = useState([]);
  const [Category, setCategory] = useState([]);
  const [TotalAmount, setTotal] = useState(0);

  // Table
  const [Table, setTable] = useState([]);

  // Search 
  const [searchQuery, setSearchQuery] = useState('');


  // Fetch Expenses
  const fetchExpenses = async () => {
    if (from == "" || to == "") {
      alert("Please Select Filter");
    }
    try {

      const response = await fetch(`${ApiHost}/api/hotel/reports/expenses`, {
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
        setData(data.output.ExpenseWise);
        setCount(data.output.ExpenseWise.Count);
        setCategory(data.output.ExpenseWise.Category);
        setTable(data.output.FullData);
        setTotal(data.output.TotalAmount);
      } else {
        alert("Failed to fetch");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, [])

  const dataPie = {
    labels: Category,
    datasets: [
      {
        data: Count,
        backgroundColor: ['#FECACA', '#FEF08A', '#FED7AA'],
        borderColor: ['#EF4444', '#F59E0B', '#F97316'],
        hoverBackgroundColor: ['#EF4444', '#F59E0B', '#F97316'],
      },
    ],
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredExpenses = Table.filter((row) =>
    row.PayableTo.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    row.PaymentStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold pb-6">
              Expenses Report
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
                      fetchExpenses();
                    }
                  }
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="w-1/3 flex items-end ">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Bearer or Payment Status..."
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>

          <div className='w-full flex gap-4 pt-6'>

            <div className="w-full bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-3xl font-semibold text-card-foreground text-zinc-500 text-center w-full">Expenses Distribution</h2>
              </div>

              <div className="flex gap-20 mb-4">
                <div className="w-full mr-2 flex">
                  <div className='w-1/2 h-[40dvh] flex justify-center items-center p-2'>
                    <Doughnut data={dataPie} />
                  </div>
                  <div className='w-1/2 p-[50px] flex flex-col items-center'>
                    <div className='w-full h-1/2 border-b border-zinc-500 flex flex-col items-center justify-end'>
                      <div className='w-full flex justify-center p-4 text-xl gap-6'>
                        <h1 className='text-2xl font-bold text-gray-700'> Total Expenses </h1>
                      </div>
                      <div className='w-full flex justify-center p-4 text-xl gap-6'>
                        <div className='bg-red-200 text-red-500 p-4 rounded-lg'>
                          <FaWallet />
                        </div>
                        <div className='h-auto flex items-center'>
                          <h1 className='text-black text-2xl'>{TotalAmount}</h1>
                        </div>
                      </div>
                    </div>
                    <div className='w-full h-1/2 flex justify-center p-4'>
                      <div className='w-full h-full flex justify-between flex-wrap'>
                        {(Data.Category && Data.Category.length !== 0 && Data.Amount && Data.Amount.length !== 0) && Data.Category.map((category, index) => (
                          <div key={index} className='w-[19dvw] flex flex-col text-2xl text-left px-[75px]'>
                            <h1 className='font-semibold text-black'>
                              {category}
                            </h1>
                            {index < Data.Amount.length && (
                              <p className='text-black'>
                                Rs. {Data.Amount[index]}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>

              </div>

            </div>

          </div>


          <div className='mt-[5dvh]'>
            <div className="bg-white p-4 rounded-lg shadow-md mt-5" >
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-3xl font-semibold text-card-foreground text-zinc-500 text-center w-full">Expenses Data</h2>
              </div>
              <div className=' flex justify-center items-center'>

                <table className="min-w-full text-black border-collapse">
                  <thead>
                    <tr className="bg-gray-500 text-white font-bold">
                      <th className="border px-4 py-2">SR#</th>
                      <th className="border px-4 py-2">Date</th>
                      <th className="border px-4 py-2">Category</th>
                      <th className="border px-4 py-2">Bearer</th>
                      <th className="border px-4 py-2">Balance Amount</th>
                      <th className="border px-4 py-2">Paid Amount</th>
                      <th className="border px-4 py-2">Note</th>
                      <th className="border px-4 py-2">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filteredExpenses.map((row, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-zinc-100 text-black font-light" : "text-black font-light"}
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{row.Date}</td>
                          <td className="border px-4 py-2">{row.ExpenseName}</td>
                          <td className="border px-4 py-2">{row.PayableTo}</td>
                          <td className="border px-4 py-2">{row.AmountPayable}</td>
                          <td className="border px-4 py-2">{row.AmountPaid}</td>
                          <td className="border px-4 py-2">{row.Note}</td>
                          <td className="border px-4 py-2">{row.PaymentStatus}</td>
                        </tr>
                      ))
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


export default Expenses_Report;
