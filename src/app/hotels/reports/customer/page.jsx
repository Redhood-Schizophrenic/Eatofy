'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useEffect, useState } from 'react';
import { FaRegFilePdf } from 'react-icons/fa6';

const Customer_Report = () => {

  const router = useRouter();

  // PDF Generation function
  const handlePdfGeneration = async () => {

    const today = new Date();
    const to_default = today.toISOString().split("T")[0];

    const inputData = document.getElementById("Customer_Report");  // Replace with your specific element if needed

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
    pdf.save(`Customer_Report (${to_default}).pdf`);
  };

  // Table
  const [Table, setTable] = useState([]);

  // Search 
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllCustomers = async () => {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/customers/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': localStorage.getItem('hotel_id'),
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {

        // Employee
        setTable(data.output);

      } else {
        alert("Failed to fetch / No Customers to display");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTable = Table.filter((bill) =>
    bill?.CustomerName.toLowerCase().includes(searchQuery.toLowerCase())
    ||
    bill?.Contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] bg-zinc-200 flex h-auto">
        <div className="flex-1 p-4">
          <div className="flex items-center mb-4 pb-6">
            <IoIosArrowBack size={50} color="red" className="cursor-pointer" onClick={() => {
              router.back()
            }} />
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold">
              Customer Report
            </h1>
          </div>

          <div className="w-full flex justify-between">
            <div className='w-1/2 flex justify-end items-end'>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Customer Name or Contact..."
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
            <div>
              <a onClick={() => { handlePdfGeneration() }} className="flex gap-2 cursor-pointer items-center bg-red-500 text-white px-4 py-2 font-semibold rounded-lg">
                Download PDF <FaRegFilePdf />
              </a>
            </div>
          </div>

          <div className='mt-[5dvh]' id='Customer_Report'>
            <div className="bg-white p-4 rounded-lg shadow-md mt-5 border-l-4 border-red-500" >
              <h2 className="text-lg font-semibold text-card-foreground text-zinc-500 pb-4">
                Customer Data
              </h2>
              <div className=' flex justify-center items-center'>
                <table className="min-w-full text-black border-collapse text-center">
                  <thead>
                    <tr className="bg-gray-500 text-white font-bold">
                      <th className="border px-4 py-2">SR#</th>
                      <th className="border px-4 py-2">Customer Name</th>
                      <th className="border px-4 py-2">Contact</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Occassion</th>
                      <th className="border px-4 py-2">Date</th>
                      <th className="border px-4 py-2">Wallet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filteredTable.length != 0 || filteredTable[0] != null || filteredTable[0] != undefined || filteredTable != 0
                        ?
                        filteredTable.map((row, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-zinc-100 text-black font-light" : "text-black font-light"}
                          >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{row.CustomerName}</td>
                            <td className="border px-4 py-2">{row.Contact}</td>
                            <td className="border px-4 py-2">{row.Email || "N/A"}</td>
                            <td className="border px-4 py-2">{row.CustomerOccassion[0]?.Occassion || "N/A"}</td>
                            <td className="border px-4 py-2">{row.CustomerOccassion[0]?.Date || "N/A"}</td>
                            <td className="border px-4 py-2">{row.EatocoinsWallet | 0} points </td>
                          </tr>
                        ))
                        : null
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

export default Customer_Report;
