'use client';

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useState } from 'react';
import "chart.js/auto";
import { Bar, Line, Pie } from 'react-chartjs-2';

const Dashboard = () => {

  //Request Params
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Orders
  const [AllOrders, setAllOrders] = useState(0);
  const [DineOrders, setDineOrders] = useState(0);
  const [TakeawayOrders, setTakeawayOrders] = useState(0);
  const [DeliveryOrders, setDeliveryOrders] = useState(0);

  // Amount
  const [TotalSales, setTotalSales] = useState(0);
  const [DineSales, setDineSales] = useState(0);
  const [TakeawaySales, setTakeawaySales] = useState(0);
  const [DeliverySales, setDeliverySales] = useState(0);

  // Chart
  const [Dates_, setDates] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [Employee, setEmployee] = useState([]);
  const [Amount, setAmount] = useState([]);
  const [EmployeeAmount, setEmployeeAmount] = useState([]);

  // Table
  const [Table, setTable] = useState([]);

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
        setAllOrders(data.output.Orders.All_Order);
        setDineOrders(data.output.Orders.Dine_In);
        setTakeawayOrders(data.output.Orders.Takeaway);
        setDeliveryOrders(data.output.Orders.Delivery);

        // Amount
        setTotalSales(data.output.Amount.All_Order);
        setDineSales(data.output.Amount.Dine_In);
        setTakeawaySales(data.output.Amount.Takeaway);
        setDeliverySales(data.output.Amount.Delivery);

        // All Orders
        setDates(data.output.Chart.All_Order.Dates);
        setOrders(data.output.Chart.All_Order.Orders);
        setAmount(data.output.Chart.All_Order.Amount);

        // Employee
        setTable(data.output.Table.All);
        setEmployee(data.output.Chart.Employee.Dates);
        setEmployeeAmount(data.output.Chart.Employee.Amount);

      } else {
        console.log("Failed to fetch");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  const dataBar = {
    labels: Employee,
    datasets: [
      {
        label: 'Sales Generated',
        data: EmployeeAmount,
        backgroundColor: 'rgba(255, 165, 0, 0.6)',
        borderColor: '#FFA500',
        borderWidth: 1,
      },
    ],
  };

  const dataLine = {
    labels: Dates_,
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

  const dataPie = {
    labels: ['Dine-in Orders', 'Takeaway Orders', 'Delivery Orders'],
    datasets: [
      {
        label: 'Order Distribution',
        data: [DineOrders, TakeawayOrders, DeliveryOrders],
        backgroundColor: ['#FECACA', '#FEF08A', '#FED7AA'],
        borderColor: ['#EF4444', '#F59E0B', '#F97316'],
        hoverBackgroundColor: ['#EF4444', '#F59E0B', '#F97316'],
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

  const optionsBar = {
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          display: false,
        }
      },
    }
  };

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-2xl uppercase font-bold pb-6">
              Dashboard
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
              className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500"
            >
              <h2 className="text-zinc-500">Dine-in Orders</h2>
              <p className="text-2xl font-bold">{DineOrders}</p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500"
            >
              <h2 className="text-zinc-500">Takeaway Orders</h2>
              <p className="text-2xl font-bold">{TakeawayOrders}</p>
            </div>
            <div
              className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500"
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

          <div className='w-full flex gap-4 pt-6'>

            <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-card-foreground text-zinc-500">Sales Distribution</h2>
              </div>
              <div className="flex gap-20 mb-4">
                <div className="w-full mr-2">
                  <div className='w-full h-[60dvh]'>
                    <Pie data={dataPie} />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-2/3 bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-card-foreground text-zinc-500">Sales Chart</h2>
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


          <div className='mt-[5dvh]'>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="w-full ml-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-card-foreground text-zinc-500">Employee Sales</h2>
                </div>
                <div className="flex justify-center items-center gap-6">
                  <div className="w-full mr-2">
                    <div className='w-[80%] h-[60dvh]'>
                      <Bar data={dataBar} options={optionsBar} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
