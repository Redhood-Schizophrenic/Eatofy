'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function Inventory_Report() {

  // For A Week before
  const today = new Date();
  const weekbefore = new Date(today);
  weekbefore.setDate(today.getDate() - 1);
  const from_default = weekbefore.toISOString().split('T')[0];
  const to_default = today.toISOString().split('T')[0];

  //Request Params
  const [from, setFrom] = useState(from_default);
  const [to, setTo] = useState(to_default);

  // Chart
  const [Amount, setAmount] = useState([]);
  const [Dates_Filter, setDates_Filter] = useState([]);

  // Payment Status Tables
  const [Available, setAvailable] = useState([]);
  const [UnAvailable, setUnAvailable] = useState([]);
  const [LowStock, setLowStock] = useState([]);
  const [AvailableStock, setAvailableStock] = useState([]);
  const [UnAvailableStock, setUnAvailableStock] = useState([]);
  const [Low, setLow] = useState([]);
  const [Total, setTotal] = useState(0);


  // Ui Elements
  const [Table, setTable] = useState([]);
  const [hotel_id, sethotel_id] = useState('');

  // Search 
  const [searchQuery, setSearchQuery] = useState('');


  // Fetch Values 
  const fetchInventoryData = async () => {
    if (from == "" || to == "") {
      alert("Please Select Filter");
    }

    try {
      const response = await fetch(`${ApiHost}/api/hotel/reports/inventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'hotel_id': hotel_id, 'from': from, 'to': to }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setTable(data.output.Data);
        setAmount(data.output.Chart.Quantity);
        setDates_Filter(data.output.Chart.Category);
        setTotal(data.output.Metrics.Total);
        setAvailableStock(data.output.Metrics.Available);
        setUnAvailableStock(data.output.Metrics.Unavailable);
        setLow(data.output.Metrics.Low);
        // Separate tables by payment status
        setAvailable([
          ...data.output?.Data,
        ].filter(bill => bill.Status.toLowerCase() === 'available'));

        setUnAvailable([
          ...data.output?.Data,
        ].filter(bill => bill.PaymentStatus.toLowerCase() === 'unavailable'));

        setLowStock([
          ...data.output?.Data,
        ].filter(bill => bill.PaymentStatus.toLowerCase() === 'low stock'));


      } else {
        alert("Failed to fetch supplier");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    sethotel_id(sessionStorage.getItem('hotel_id'));
    if (hotel_id) {
      fetchInventoryData();
    }
  }, [hotel_id])

  const dataLine = {
    labels: Dates_Filter,
    datasets: [
      {
        label: '(kg/ltr)',
        data: Amount,
        borderColor: '#FFA500',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FFA500',
        pointHoverBackgroundColor: '#FFA500',
        pointBorderColor: '#FFF',
        pointHoverBorderColor: '#FFF',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, // Remove the grid lines
        },
        ticks: {
          font: {
            family: 'Poppins', // Use Poppins font
            weight: 'bold', // Make the x-axis text bold
          }
        }
      },
      y: {
        stacked: true,
        grid: {
          display: false, // Remove the grid lines
        },
        ticks: {
          font: {
            family: 'Poppins', // Use Poppins font
            weight: 'bold', // Make the y-axis text bold
          }
        }
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Poppins', // Use Poppins font
            weight: 'bold', // Make the legend text bold
          }
        }
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTable = Table.filter((item) =>
    item.Items?.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold pb-6">
              Inventory Reports
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
                      fetchInventoryData();
                    }
                  }
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-start items-end w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Material Name..."
              className="px-4 py-2 border rounded-lg w-1/2"
            />
          </div>

          <div className="flex w-full mt-10 gap-4 pb-4">
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 cursor-pointer w-1/4"
              onClick={() => {
                setTable(Available);
              }}
            >
              <h2 className="text-zinc-500">Available Products</h2>
              <p className="text-2xl font-bold">{AvailableStock}</p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 cursor-pointer w-1/4"
              onClick={() => {
                setTable(UnAvailable);
              }}
            >
              <h2 className="text-zinc-500">Empty Stock</h2>
              <p className="text-2xl font-bold">{UnAvailableStock}</p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500 cursor-pointer w-1/4"
              onClick={() => {
                setTable(LowStock);
              }}
            >
              <h2 className="text-zinc-500">Low Stock</h2>
              <p className="text-2xl font-bold">{Low}</p>
            </div>

            <div
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 w-1/4"
            >
              <h2 className="text-zinc-500"> Total Products </h2>
              <p className="text-xl font-bold">{Total}</p>
            </div>

          </div>

          <div className='w-full flex gap-4 pt-6'>

            <div className="w-full bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-xl font-semibold text-card-foreground text-zinc-500 text-center w-full">Overall Material Chart</h2>
              </div>
              <div className="flex gap-20 mb-4">
                <div className="w-full mr-2">
                  <div className='w-full h-[60dvh]'>
                    <Line data={dataLine} options={options} />
                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* Table */}
          <div className='mt-[5dvh]'>
            <div className="bg-white p-4 rounded-lg shadow-md mt-5 border-l-4 border-red-500" >
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-xl font-semibold text-card-foreground text-zinc-500 text-center w-full">Purchases Data</h2>
              </div>
              <div className=' flex justify-center items-center'>
                <table className="table-fixed w-full p-2">
                  <thead className="bg-gray-500 text-white">
                    <tr className="font-bold text-left">
                      <th className="p-4">SR#</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Material</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Unit</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-zinc-100">
                    {
                      filteredTable.map((items, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-zinc-100 text-black font-light" : "text-black font-light"}
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{items.Date}</td>
                          <td className="border px-4 py-2">{items.Items?.ItemName}</td>
                          <td className="border px-4 py-2">{items.Quantity}</td>
                          <td className="border px-4 py-2">{items.Unit}</td>
                          <td className="border px-4 py-2">
                          <span
                              className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-lg ${
                                items.Status.toLowerCase() === "available"
                                  ? "bg-green-200 text-green-800"
                                  : items.Status.toLowerCase() === "unavailable"
                                  ? "bg-red-200 text-red-800"
                                  : items.Status.toLowerCase() ===
                                    "low stock"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : "bg-gray-200 text-gray-800"
                              }`}
                            >
                              {items.Status}
                            </span>
                            {}
                            </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}