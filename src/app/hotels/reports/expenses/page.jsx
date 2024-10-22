'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';
import { FaRegFilePdf, FaWallet } from 'react-icons/fa6';

const Expenses_Report = () => {

  const router = useRouter();

  // For A Week before
  const today = new Date();
  const weekbefore = new Date(today);
  weekbefore.setDate(today.getDate() - 1);
  const from_default = weekbefore.toISOString().split('T')[0];
  const to_default = today.toISOString().split('T')[0];
  const [selectedRange, setselectedRange] = useState('Today');

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


  // PDF Generation function
  const handlePdfGeneration = async () => {
    const inputData = document.getElementById("Report");  // Replace with your specific element if needed

    // Take a screenshot of the whole page
    const canvas = await html2canvas(inputData, { scale: 2 });

    // Get the image dimensions
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 180;  // Width of the Image in mm
    const pageWidth = 210;  // Width of the PDF page (in mm)  
    const pageHeight = 290; // Height of the PDF page in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const heightLeft = imgHeight;
    // Calculate margins to center the image on the page
    const xOffset = (pageWidth - imgWidth) / 2;  // Horizontal centering


    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 10;

    // Add the image to the first page
    pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
    let remainingHeight = heightLeft - pageHeight;

    // Loop through the rest of the image, adding new pages as needed
    while (remainingHeight > 0) {
      position = remainingHeight - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
    }

    // Save the PDF
    pdf.save(`${selectedRange}'s_Expenses_Report_ (${to_default}).pdf`);
  };

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
          'hotel_id': localStorage.getItem('hotel_id'),
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
        break;

      case 'Week':
        from_input = new Date().toISOString().split('T')[0]; // Today's date
        to_input = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0]; // 7 days ago
        setFrom(to_input);
        setTo(from_input);
        break;

      case 'Month':
        from_input = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]; // First day of the current month
        to_input = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]; // Last day of the current month
        setFrom(from_input);
        setTo(to_input);
        break;

      case 'Year':
        from_input = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0]; // January 1st of the current year
        to_input = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0]; // December 31st of the current year
        setFrom(from_input);
        setTo(to_input);
        break;

      case 'custom':
        setselectedRange('custom'); // You will probably handle custom logic elsewhere
        break;

      default:
        from_input = from_default;
        to_input = to_default;
        setFrom(from_input);
        setTo(to_input);
        break;
    }
  };


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
          <div className="flex justify-between items-center mb-4 pb-6">
            <div className="flex gap-4 items-center">
              <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
                router.back()
              }} />

              <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">
                Expenses Report
              </h1>
            </div>

            <div className="flex gap-4">
              <div className='flex flex-col justify-center text-sm font-semibold text-zinc-700 items-end'>
                <select value={selectedRange} onChange={(e) => { e.preventDefault(); handleRangeChange(e.target.value); }} className='w-[200px] rounded-lg'>
                  <option value='Today'>Today</option>
                  <option value='Week'>Week</option>
                  <option value='Month'>Month</option>
                  <option value='Year'>Year</option>
                  <option value="custom">--Custom--</option>
                </select>
              </div>
              <div className="flex items-center">
                <div className="flex items-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => {
                      fetchExpenses();
                    }}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {
            selectedRange === 'custom' && (
              <div className='w-full h-dvh fixed top-0 left-0 bg-black bg-opacity-70 flex justify-center items-center'>
                <div className="flex items-center space-x-4">
                  <div className='flex flex-col text-sm font-semibold text-zinc-700 items-center'>
                    <label htmlFor="from" className='text-white'>
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
                    <label htmlFor="to" className='text-white'>
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
                          setselectedRange('');
                          fetchExpenses();
                        }
                      }
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div>
            )
          }

          <div className='w-full flex justify-between'>
            <div className="w-1/3 flex items-end ">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Bearer or Payment Status..."
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
            <div>
              <a onClick={() => { handlePdfGeneration() }} className=" cursor-pointer flex gap-2 items-center bg-red-500 text-white px-4 py-2 font-semibold rounded-lg">
                Download PDF <FaRegFilePdf />
              </a>
            </div>
          </div>

          <div id="Report">

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
                            <div key={index} className='w-[14dvw] flex flex-col text-xl text-left'>
                              <h1 className='font-semibold text-black'>
                                {category}
                              </h1>
                              {index < Data.Amount.length && (
                                <p className='text-black text-lg'>
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
        </div>
      </div >
    </>
  );
}


export default Expenses_Report;
