"use client";
import { useState, useEffect } from "react";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { IoReceiptOutline } from "react-icons/io5";
import { IoMdLogOut, IoMdLogIn } from "react-icons/io";
import { FaStarHalfAlt } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);


const StaffReport = () => {

  // For A Week before
  const today = new Date();
  const weekbefore = new Date(today);
  weekbefore.setDate(today.getDate() - 1);
  const from_default = weekbefore.toISOString().split('T')[0];
  const to_default = today.toISOString().split('T')[0];

  //Request Params
  const [from, setFrom] = useState(from_default);
  const [to, setTo] = useState(to_default);

  // Staff Details
  const [StaffName, setStaffName] = useState('');
  const [PerformanceGrade, setPerformanceGrade] = useState('');
  const [Performance, setPerformance] = useState(0);
  const [SalesAmt, setSalesAmt] = useState(0);
  const [SalesCount, setSalesCount] = useState(0);
  const [PresentPercent, setPresentPercent] = useState(0);
  const [PresentDays, setPresentDays] = useState(0);
  const [AbsentPercent, setAbsentPercent] = useState(0);
  const [AbsentDays, setAbsentDays] = useState(0);
  const [HalfDaysPercent, setHalfDaysPercent] = useState(0);
  const [HalfDays, setHalfDays] = useState(0);
  const [SalesChart, setSalesChart] = useState([]);
  const [SalesChartDays, setSalesChartDays] = useState([]);

  // Table
  const [Table, setTable] = useState([]);

  // Search 
  const [searchQuery, setSearchQuery] = useState('');

  const progress_data = {
    datasets: [
      {
        data: [Performance, 100 - Performance],
        backgroundColor: ['#4caf50', '#e6e6e6'],
        borderWidth: 0,
      },
    ],
  };

  const dataLine = {
    labels: SalesChartDays,
    datasets: [
      {
        label: 'Revenues',
        data: SalesChart,
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
    cutout: '70%', // This controls the size of the inner hole, adjust as needed
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true, // Disable tooltips if not needed
      },
    },
  };

  const options_line = {
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


  async function fetchReport() {
    const staff_id = sessionStorage.getItem('Staff_Report_Id');
    const staff_name = sessionStorage.getItem('Staff_Report_Name');
    setStaffName(staff_name);

    try {
      const response = await fetch(`${ApiHost}/api/hotel/reports/staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ staff_id, from, to }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.returncode === 200 && Array.isArray(result.output)) {
          setTable(result?.output[0]?.Sales?.Data);
          setPerformance((result?.output[0]?.Performance?.Percent));
          setPerformanceGrade(result?.output[0]?.Performance?.Grade);
          setSalesAmt(result?.output[0]?.Sales?.Amount);
          setSalesCount(result?.output[0]?.Sales?.Orders);
          setPresentPercent(result?.output[0]?.Attendance?.Present?.Ratio);
          setPresentDays(result?.output[0]?.Attendance?.Present?.Count);
          setAbsentPercent(result?.output[0]?.Attendance?.Absent?.Ratio);
          setAbsentDays(result?.output[0]?.Attendance?.Absent?.Count);
          setHalfDaysPercent(result?.output[0]?.Attendance?.['Half-Days']?.Ratio);
          setHalfDays(result?.output[0]?.Attendance?.['Half-Days']?.Count);
          setSalesChart(result?.output[0]?.Sales?.Chart?.Amount);
          setSalesChartDays(result?.output[0]?.Sales?.Chart?.Category);
        }
        else {
          console.error("Unexpected response format:", result);
        }
      }
      else {
        console.error("Failed to fetch staff list");
      }
    } catch (error) {
      console.error("Error:", error);
    }

  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTable = Table.filter((bill) =>
    bill.Table?.TableName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill.Waiter.FirstName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill.Waiter.LastName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill.Customer?.CustomerName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill.Status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchReport();
  }, [])

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="mb-10 flex justify-between">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold pt-4">
              Staff Report
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col text-sm font-semibold text-zinc-700 items-center">
                <label htmlFor="from">From</label>
                <input
                  type="date"
                  id="from"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col text-sm font-semibold text-zinc-700 items-center">
                <label htmlFor="to">To</label>
                <input
                  type="date"
                  id="to"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-end pt-6">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    fetchReport();
                  }}
                >
                  Filter
                </button>
              </div>
            </div>
            <div className="flex justify-end items-end w-[25%]">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Table, Waiter, Payment Status or Customer..."
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
          </div>

          <div className="w-full flex justify-between">
            <h2 className="text-xl">Performance Status of <span className="font-bold">{StaffName}</span> :</h2>
          </div>

          <div className="w-full flex mt-[5dvh] gap-4 text-zinc-500">
            <div className="bg-white  p-4 rounded-lg shadow-md border-l-4 border-red-500 cursor-pointer w-1/5">
              <h1 className="font-bold">Performance</h1>
              <div className="flex justify-between items-center h-auto">
                <div className="flex flex-col justify-center">
                  <h2 className="font-bold text-black text-2xl"> {Performance}% </h2>
                  <p
                    className={`text-xs border-l-4 mt-3 pl-2
                            ${(Performance > 90) ? 'border-green-500' :
                        (Performance > 75 && Performance < 90) ? 'border-green-300' :
                          (Performance > 50 && Performance < 75) ? 'border-yellow-500' :
                            (Performance < 50) ? 'border-red-500' :
                              'border-gray-500'
                      }`}
                  >
                    {PerformanceGrade}
                  </p>
                </div>
                <div className="w-[100px] h-[100px] flex items-center ml-10">
                  <Doughnut data={progress_data} options={options} />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col justify-between w-1/5">
              <div className='flex justify-between text-lg'>
                <h1 className="font-bold">Sales Generated</h1>
              </div>
              <div className="flex justify-between items-center">
                <div className="">
                  <p className="text-2xl font-bold text-black">Rs. {SalesAmt | 0}</p>
                  <p className="text-zinc-500 text-sm">{SalesCount} Orders</p>
                </div>
                <div className="bg-orange-400 p-2 rounded-lg">
                  <IoReceiptOutline size={55} color="white" fontSize={600} />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col justify-between w-1/5">
              <div className='flex justify-between text-lg'>
                <h1 className="font-bold">Days Present</h1>
              </div>
              <div className="flex justify-between items-center">
                <div className="">
                  <p className="text-2xl font-bold text-black"> {PresentPercent}% </p>
                  <p className="text-zinc-500 text-sm">{PresentDays} Days</p>
                </div>
                <div className="bg-orange-400 p-2 rounded-lg">
                  <IoMdLogIn size={55} color="white" fontSize={600} />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col justify-between w-1/5">
              <div className='flex justify-between text-lg'>
                <h1 className="font-bold">Days Absent</h1>
              </div>
              <div className="flex justify-between items-center">
                <div className="">
                  <p className="text-2xl font-bold text-black">{AbsentPercent}%</p>
                  <p className="text-zinc-500 text-sm">{AbsentDays} Days</p>
                </div>
                <div className="bg-orange-400 p-2 rounded-lg">
                  <IoMdLogOut size={55} color="white" fontSize={600} />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 flex flex-col justify-between w-1/5">
              <div className='flex justify-between text-lg'>
                <h1 className="font-bold">Half-Days Taken</h1>
              </div>
              <div className="flex justify-between items-center">
                <div className="">
                  <p className="text-2xl font-bold text-black">{HalfDaysPercent}%</p>
                  <p className="text-zinc-500 text-sm">{HalfDays} Days</p>
                </div>
                <div className="bg-orange-400 p-2 rounded-lg">
                  <FaStarHalfAlt size={55} color="white" fontSize={600} />
                </div>
              </div>
            </div>

          </div>

          <div className="mt-[5dvh]">
            <div className="bg-white p-4 rounded-lg shadow-md mt-5 border-l-4 border-red-500">
              <h2 className="text-lg font-semibold text-card-foreground text-zinc-500 pb-4">
                Sales Data
              </h2>
              <div className=" flex justify-center items-center">
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
                    {filteredTable.length != 0 ||
                      filteredTable[0] != null ||
                      filteredTable[0] != undefined ||
                      filteredTable != 0
                      ? filteredTable.map((row, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-zinc-100 text-black font-light"
                              : "text-black font-light"
                          }
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{row.Date}</td>
                          <td className="border px-4 py-2">{row.Type}</td>
                          <td className="border px-4 py-2">
                            {row.Waiter.FirstName} {row.Waiter.LastName}
                          </td>
                          <td className="border px-4 py-2">{row.TotalAmount}</td>
                          <td className="border px-4 py-2">{row.BalanceAmount}</td>
                          <td className="border px-4 py-2">{row.PaymentMode}</td>
                          <td className="border px-4 py-2">{row.Status}</td>
                        </tr>
                      ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
};
export default StaffReport
