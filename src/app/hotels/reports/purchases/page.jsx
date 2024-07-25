'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useState } from 'react';
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { FaEye, FaXmark } from "react-icons/fa6";

export default function Purchase_management() {

  //Request Params
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Expense-Wise
  const [Amount, setAmount] = useState([]);
  const [Dates_Filter, setDates_Filter] = useState([]);
  const [TotalAmount, setTotal] = useState(0);

  // Ui Elements
  const [displayStock, setDisplayStock] = useState(false);
  const [fetchedpurchase, setfetchedpurchase] = useState([]);
  const hotel_id = sessionStorage.getItem('hotel_id');
  const [invoice, setInvoice] = useState({});
  const [Stock, setStock] = useState([]);


  // Fetch Values 
  const fetchPurchaseData = async () => {
    if (from == "" || to == "") {
      alert("Please Select Filter");
    }

    try {
      const response = await fetch(`${ApiHost}/api/hotel/reports/purchases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'hotel_id': hotel_id, 'from': from, 'to': to }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setfetchedpurchase(data.output.Invoices);
        setAmount(data.output.DateWise.Amount);
        setDates_Filter(data.output.DateWise.Dates);
        setTotal(data.output.TotalAmount);

      } else {
        console.log("Failed to fetch supplier");
      }

    } catch (e) {
      throw console.error(e);
    }
  }


  // Display purchase info
  const displayPurchasedStock = async (invoice_info) => {

    try {

      const response = await fetch(`${ApiHost}/api/hotel/inventory/purchased/stock/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'invoice_id': invoice_info.id
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setStock(data);
      } else {
        console.log('Failed to get by date');
      }

    } catch (e) {
      throw console.error(e);
    }

    setDisplayStock(true);
    setInvoice(invoice_info);
  }

  const dataLine = {
    labels: Dates_Filter,
    datasets: [
      {
        label: 'Revenues',
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

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-2xl uppercase font-bold pb-6">
              Purchase Reports
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
                      fetchPurchaseData();
                    }
                  }
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full">
            <div
              className="mt-10 bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500"
            >
              <h2 className="text-xl text-zinc-500"> Total Purchases </h2>
              <p className="text-xl font-bold">Rs. {TotalAmount}</p>
            </div>
          </div>

          <div className='w-full flex gap-4 pt-6'>

            <div className="w-full bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-xl font-semibold text-card-foreground text-zinc-500 text-center w-full">Purchases Chart</h2>
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
            <div className="bg-white p-4 rounded-lg shadow-md mt-5" >
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-xl font-semibold text-card-foreground text-zinc-500 text-center w-full">Purchases Data</h2>
              </div>
              <div className=' flex justify-center items-center'>
                <table className="table-fixed w-full p-2">
                  <thead className="bg-red-500 text-white">
                    <tr className="font-bold text-left">
                      <th className="p-4">From</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Balance(amt)</th>
                      <th className="p-4">Payment mode</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Invoice Date</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-zinc-100">
                    {
                      fetchedpurchase.map((items, index) => (
                        <tr key={index} className="text-left">
                          <td className="p-3">{items.Suppliers.SupplierName}</td>
                          <td className="p-3">{items.TotalAmount}</td>
                          <td className="p-3">{items.BalanceAmount}</td>
                          <td className="p-3">{items.PaymentMode}</td>
                          <td className="p-3 inline-flex justify-center items-center">
                            <div className={`px-4 p-2`}>{items.PaymentStatus}</div>
                          </td>
                          <td className="p-3">{items.Date}</td>
                          <td className="p-3">
                            <button
                              onClick={() => { displayPurchasedStock(items) }}
                            >
                              <FaEye size={25} />
                            </button>
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
      {
        displayStock
          ?
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 w-[60dvw] rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl text-red-500 font-bold"> Purchase Invoice </h3>
                <div>
                  <button
                    onClick={() => { setDisplayStock(false) }}
                    className="text-gray-500 rounded-full hover:bg-zinc-200 hover:text-gray-700 p-4"
                  >
                    <FaXmark size={30} />
                  </button>
                </div>
              </div>
              <div>

                <h3 className="bg-zinc-200 text-black font-bold p-2 text-center"> Invoice Details </h3>
                <div className="flex justify-center items-center mb-6 mt-4">
                  <p className="text-xl font-medium">{invoice.Suppliers.SupplierName}</p>
                </div>
                <div className="p-4 flex justify-between mb-4">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Invoice No: </h1>
                    <p>#{invoice.InvoiceNo}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Invoice Date: </h1>
                    <p>{invoice.Date}</p>
                  </div>
                </div>
                <div className="p-4 flex justify-between">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Total Amount: </h1>
                    <p>Rs. {invoice.TotalAmount}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Balance Amount: </h1>
                    <p>Rs. {invoice.BalanceAmount}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Payment Mode: </h1>
                    <p>{invoice.PaymentMode}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Payment Status: </h1>
                    <p>{invoice.PaymentStatus}</p>
                  </div>
                </div>
                <h3 className="bg-zinc-200 text-black font-bold p-2 text-center"> Stocks Purchased </h3>
                <div className="pt-4">
                  <table className="min-w-full text-center">
                    <thead>
                      <tr className="bg-zinc-600 text-gray-200">
                        <th className="py-2 border border-white">Item</th>
                        <th className="py-2 border border-white">Quantity</th>
                        <th className="py-2 border border-white">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Stock.output.map((stock, index) => (
                          <tr className="bg-zinc-200 text-black" key={index}>
                            <td className="py-2 border border-white">{stock.Items.ItemName}</td>
                            <td className="py-2 border border-white">{stock.Quantity}</td>
                            <td className="py-2 border border-white">Rs. {stock.Unit}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="hidden"></div>
      }

    </>
  )
}
