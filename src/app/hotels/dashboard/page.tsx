'use client';

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import { Line } from 'react-chartjs-2';
import { MdNotificationsNone } from 'react-icons/md';

const Dashboard: React.FC = () => {
  const [updatedAr, setupdatedAr] = useState([]);
  const [paymentsData, setpaymentsData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalSales, settotalSales] = useState(0);
  const [totalOrders, settotalOrders] = useState(0);
  const [totalDinein, settotalDinein] = useState(0);
  const [totalTakeaway, settotalTakeaway] = useState(0);

  const fetchAllOrders = async () => {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/bills/management/fetch/hotel`, {
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
        console.log("order fetched", data.output);
        setOrders(data.output);
        calculateTotalOrders(data.output);
        calculateTotalDinein(data.output);
        calculateTotalTakeaway(data.output);
        orders_data(data.output);
        updated_orders_data(data.output)
      } else {
        console.log("Failed to fetch");
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  const Waiters = orders.map((waiters: any) => waiters.Waiter)
  const tables = orders.map((tables: any) => tables.Table)

  const calculateTotalOrders = (orders: any[]) => {
    const total = orders.length;
    settotalOrders(total);
    const sales_total = orders.reduce((sum, order) => sum + order.TotalAmount, 0);
    settotalSales(sales_total);
  };

  const calculateTotalDinein = (orders: any[]) => {
    const dineinOrders = orders.filter(order => order.Type === 'Dine-In');
    console.log("Dine In", dineinOrders);
    const total = dineinOrders.length;
    settotalDinein(total);
  };

  const calculateTotalTakeaway = (orders: any[]) => {
    const takeawayOrders = orders.filter(order => order.Type === 'TakeAway');
    const total = takeawayOrders.length;
    settotalTakeaway(total);
  };

  const orders_data = (orders: any[]) => {
    const data = orders.map((item: any) => item.TotalAmount);
    setOrdersData(data);
  }

  const updated_orders_data = (orders: any[]) => {
    const data = orders.map(item => item).reverse().slice(7, 12);
    const data1 = data.map((item: any) => item.TotalAmount);
    setupdatedAr(data);
    setpaymentsData(data1);
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  const dataLine = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'Revenues',
        data: ordersData,
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

  const dataLine1 = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'Revenues',
        data: paymentsData,
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
            // family: 'Poppins', // Use Poppins font
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
            // family: 'Poppins', // Use Poppins font
            weight: 'bold', // Make the y-axis text bold
          }
        }
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            // family: 'Poppins', // Use Poppins font
            weight: 'bold', // Make the legend text bold
          }
        }
      }
    }
  };


  console.log(Waiters);
  console.log("Array", updatedAr);

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-red-500 text-2xl font-bold">EATOFY</h1>
            <div className="flex items-center space-x-4">
              <MdNotificationsNone size={30} />
              <div className="bg-zinc-900 rounded-full w-8 h-8"></div>
              <span>Profile &gt;&gt;&gt;&gt;&gt;</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-green-500">
              <h2 className="text-zinc-500">Total Orders</h2>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500">
              <h2 className="text-zinc-500">Total Dine-in Orders</h2>
              <p className="text-2xl font-bold">{totalDinein}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-green-500">
              <h2 className="text-zinc-500">Total Takeaway Orders</h2>
              <p className="text-2xl font-bold">{totalTakeaway}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500">
              <h2 className="text-zinc-500">Total Sales</h2>
              <p className="text-2xl font-bold">₹ {totalSales}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-zinc-500">Sales over time</h2>

            </div>
            <div className="flex gap-20 mb-4">
              <div className="w-full mr-2">
                <div className="flex space-x-2">
                  <button className="bg-zinc-200 text-zinc-700 py-1 px-3 rounded">Revenues</button>
                  <button className="bg-zinc-200 text-zinc-700 py-1 px-3 rounded">Ordered items</button>
                </div>
                <div className='w-[90dvw] h-[60dvh]'>
                  <Line data={dataLine} options={options} />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-[5dvh]'>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="w-full ml-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-card-foreground">Latest Payments</h2>
                  <button className="text-muted-foreground">
                    <img alt="menu" src="https://openui.fly.dev/openui/24x24.svg?text=⋮" />
                  </button>
                </div>
                <div className="flex justify-center items-center gap-6">
                  <ul className='w-1/2 p-4'>
                    {
                      updatedAr.map((items: any) => {
                        return (
                          <li key={items.id} className="flex items-center mb-4">
                            <div className="flex-1">
                              <p className="text-card-foreground font-bold">{items.Waiter.FirstName}</p>
                              <p className="text-muted-foreground text-sm">
                                {items.Table.TableName}
                              </p>
                              <p className="text-sm text-green-500">₹ {items.TotalAmount}</p>
                            </div>
                            <img className="w-5 h-5" src="https://openui.fly.dev/openui/16x16.svg?text=📅" alt="Payment method" />
                          </li>
                        )
                      })
                    }
                  </ul>
                  <div className='w-1/2 border border-black rounded-lg p-4'>
                    <Line data={dataLine1} options={options} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mt-5" >
              <h1 className=' text-1xl text-slate-600'>Third Party Orders</h1>
              <div className=' flex justify-center items-center'>
                <h2 className=' text-5xl'>Coming Soon</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
