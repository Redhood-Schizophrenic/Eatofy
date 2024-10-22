'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { FaEye, FaRegFilePdf, FaXmark } from "react-icons/fa6";

export default function Purchase_Report() {

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
  const [Amount, setAmount] = useState([]);
  const [Dates_Filter, setDates_Filter] = useState([]);
  const [TotalAmount, setTotal] = useState(0);

  // Payment Status Tables
  const [PaidTable, setPaidTable] = useState([]);
  const [UnpaidTable, setUnpaidTable] = useState([]);
  const [PartPaidTable, setPartPaidTable] = useState([]);

  // Ui Elements
  const [displayStock, setDisplayStock] = useState(false);
  const [fetchedpurchase, setfetchedpurchase] = useState([]);
  const [hotel_id, sethotel_id] = useState('');
  const [invoice, setInvoice] = useState({});
  const [Stock, setStock] = useState([]);

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
    pdf.save(`${selectedRange}'s_Purchase_Report_ (${to_default}).pdf`);
  };

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
        // Separate tables by payment status
        setPaidTable([
          ...data.output?.Invoices,
        ].filter(bill => bill.PaymentStatus.toLowerCase() === 'paid'));

        setUnpaidTable([
          ...data.output?.Invoices,
        ].filter(bill => bill.PaymentStatus.toLowerCase() === 'unpaid'));

        setPartPaidTable([
          ...data.output?.Invoices,
        ].filter(bill => bill.PaymentStatus.toLowerCase() === 'part-paid'));


      } else {
        alert("Failed to fetch supplier");
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
        alert('Failed to get by date');
      }

    } catch (e) {
      throw console.error(e);
    }

    setDisplayStock(true);
    setInvoice(invoice_info);
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
    sethotel_id(localStorage.getItem('hotel_id'));
    if (hotel_id) {
      fetchPurchaseData();
    }
  }, [hotel_id])

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPurchases = fetchedpurchase.filter((item) =>
    item.Suppliers?.SupplierName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    item.PaymentStatus?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 items-center pb-6">
              <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
                router.back()
              }} />
              <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold ">
                Purchases Reports
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
                      fetchPurchaseData();
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
                          fetchPurchaseData();
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

          <div className="flex justify-between items-center w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Supplier Name or Payment Status..."
              className="px-4 py-2 border rounded-lg w-1/2"
            />

            <div>
              <a onClick={() => { handlePdfGeneration() }} className="cursor-pointer flex gap-2 items-center bg-red-500 text-white px-4 py-2 font-semibold rounded-lg">
                Download PDF <FaRegFilePdf />
              </a>
            </div>
          </div>

          <div id="Report">

            <div className="flex w-full mt-10 gap-4 pb-4">
              <div
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 cursor-pointer w-1/4"
                onClick={() => {
                  setfetchedpurchase(PaidTable);
                  setTotal(PaidTable.reduce((sum, bill) => sum + bill.TotalAmount, 0));
                }}
              >
                <h2 className="text-zinc-500">Paid Bills</h2>
                <p className="text-2xl font-bold">{PaidTable.length}</p>
              </div>
              <div
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 cursor-pointer w-1/4"
                onClick={() => {
                  setfetchedpurchase(UnpaidTable);
                  setTotal(UnpaidTable.reduce((sum, bill) => sum + bill.TotalAmount, 0));
                }}
              >
                <h2 className="text-zinc-500">Unpaid Bills</h2>
                <p className="text-2xl font-bold">{UnpaidTable.length}</p>
              </div>
              <div
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500 cursor-pointer w-1/4"
                onClick={() => {
                  setfetchedpurchase(PartPaidTable);
                  setTotal(PartPaidTable.reduce((sum, bill) => sum + bill.TotalAmount, 0));
                }}
              >
                <h2 className="text-zinc-500">Part-Paid Bills</h2>
                <p className="text-2xl font-bold">{PartPaidTable.length}</p>
              </div>

              <div
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500 w-1/4"
              >
                <h2 className="text-xl text-zinc-500"> Total Purchases </h2>
                <p className="text-xl font-bold">Rs. {TotalAmount}</p>
              </div>

            </div>

            <div className='w-full flex gap-4 pt-6'>

              <div className="w-full bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                <div className="flex justify-between items-center mb-4 w-full">
                  <h2 className="text-xl font-semibold text-card-foreground text-zinc-500 text-center w-full">Overall Purchases Chart</h2>
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
                        filteredPurchases.map((items, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-zinc-100 text-black font-light" : "text-black font-light"}
                          >

                            <td className="border px-4 py-2">{items.Suppliers.SupplierName}</td>
                            <td className="border px-4 py-2">{items.TotalAmount}</td>
                            <td className="border px-4 py-2">{items.BalanceAmount}</td>
                            <td className="border px-4 py-2">{items.PaymentMode}</td>
                            <td className="border px-4 py-2 inline-flex justify-center items-center">
                              <div className={`px-4 p-2`}>{items.PaymentStatus}</div>
                            </td>
                            <td className="border px-4 py-2">{items.Date}</td>
                            <td className="border px-4 py-2">
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
                        <th className="py-2 border border-white">Unit</th>
                        <th className="py-2 border border-white">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Stock.output.map((stock, index) => (
                          <tr className="bg-zinc-200 text-black" key={index}>
                            <td className="py-2 border border-white">{stock.Items.ItemName}</td>
                            <td className="py-2 border border-white">{stock.Quantity}</td>
                            <td className="py-2 border border-white">{stock.Unit}</td>
                            <td className="py-2 border border-white">
                              <h2 className="">Rs. {stock.Price}</h2>
                              <p className="text-xs text-zinc-500">Rs. {stock.PerPrice} per.</p>
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
          :
          <div className="hidden"></div>
      }

    </>
  )
}
