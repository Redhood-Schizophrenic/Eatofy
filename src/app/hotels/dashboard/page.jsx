'use client';

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { BiDish } from 'react-icons/bi';
import { MdOutlineShowChart } from 'react-icons/md';
import { TbPaperBag } from 'react-icons/tb';
import { RiEBike2Fill } from 'react-icons/ri';

const Dashboard = () => {

  // For A Week before
  const today = new Date();
  const weekbefore = new Date(today);
  weekbefore.setDate(today.getDate());
  const from_default = weekbefore.toISOString().split('T')[0];
  const to_default = today.toISOString().split('T')[0];
  const [selectedRange, setselectedRange] = useState('Today');

  //Request Params
  const [from, setFrom] = useState(from_default);
  const [to, setTo] = useState(to_default);

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
          'hotel_id': localStorage.getItem('hotel_id'),
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
        setAmount(data.output.Chart.All_Order.Amount);

        // Employee
        setTable(data.output.Table.All);
        setEmployee(data.output.Chart.Employee.Dates);
        setEmployeeAmount(data.output.Chart.Employee.Amount);

      } else {
        alert("Failed to fetch");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  const handleRangeChange = (selectedOption) => {
    setselectedRange(selectedOption);
    const today = new Date();
    let from_input, to_input

    switch (selectedOption) {
      case 'Today':
        from_input = from_default; // Assuming this is the correct default for today
        to_input = to_default;
        setFrom(from_input);
        setTo(to_input);
        fetchAllOrders();
        break;

      case 'Week':
        from_input = new Date().toISOString().split('T')[0]; // Today's date
        to_input = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0]; // 7 days ago
        setFrom(to_input);
        setTo(from_input);
        fetchAllOrders();
        break;

      case 'Month':
        from_input = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]; // First day of the current month
        to_input = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]; // Last day of the current month
        setFrom(from_input);
        setTo(to_input);
        fetchAllOrders();
        break;

      case 'Year':
        from_input = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0]; // January 1st of the current year
        to_input = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0]; // December 31st of the current year
        setFrom(from_input);
        setTo(to_input);
        fetchAllOrders();
        break;

      case 'custom':
        setselectedRange('custom'); // You will probably handle custom logic elsewhere
        break;

      default:
        from_input = from_default;
        to_input = to_default;
        setFrom(from_input);
        setTo(to_input);
        fetchAllOrders();
        break;
    }
  };

  useEffect(() => {
    fetchAllOrders()
  }, [])

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
      <div className="ml-[70px] bg-gray-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-4xl uppercase font-bold pb-6">
              Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <div className='flex flex-col justify-center text-sm font-semibold text-zinc-700 items-center'>
                <select value={selectedRange} onChange={(e) => { e.preventDefault(); handleRangeChange(e.target.value); }} className='w-[200px] rounded-lg'>
                  <option value='Today'>Today</option>
                  <option value='Week'>Week</option>
                  <option value='Month'>Month</option>
                  <option value='Year'>Year</option>
                </select>
              </div>
              {/*<div className='flex items-end pr-4'>
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
              </div>*/}
            </div>
          </div>
          {
            selectedRange === 'custom' && (
              <div className='w-full h-dvh fixed top-0 left-0 bg-black bg-opacity-70 flex justify-center items-center'>
                <button className='bg-red-500 text-white text-lg p-1 px-4 rounded-lg' onClick={() => { setselectedRange('Today') }}>filter</button>
              </div>
            )
          }

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2">
              <div className='flex justify-between'>
                <h2 className="text-zinc-500 text-sm">Total Orders</h2>
                <MdOutlineShowChart size={20} />
              </div>
              <p className="text-lg font-bold">Rs. {TotalSales | 0}</p>
              <p className="text-zinc-500 text-sm">{AllOrders} Orders</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2">
              <div className='flex justify-between'>
                <h2 className="text-zinc-500 text-sm">Dine-in Orders</h2>
                <BiDish size={20} />
              </div>
              <p className="text-lg font-bold">Rs. {DineSales | 0}</p>
              <p className="text-zinc-500 text-sm">{DineOrders} Orders</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2">
              <div className='flex justify-between'>
                <h2 className="text-zinc-500 text-sm">Takeaway Orders</h2>
                <TbPaperBag size={20} />
              </div>
              <p className="text-lg font-bold">Rs. {TakeawaySales | 0}</p>
              <p className="text-zinc-500 text-sm">{TakeawayOrders} Orders</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col gap-2">
              <div className='flex justify-between'>
                <h2 className="text-zinc-500 text-sm">Delivery Orders</h2>
                <RiEBike2Fill size={20} />
              </div>
              <p className="text-lg font-bold">Rs. {DeliverySales | 0}</p>
              <p className="text-zinc-500 text-sm">{DeliveryOrders} Orders</p>
            </div>
          </div>

          <div className='w-full flex gap-4 pt-6'>

            <div className="w-1/3 bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
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

            <div className="w-2/3 bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
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
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
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
          </div>
        </div>
      </div >
    </>
  );
}


export default Dashboard;
