"use client";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useState, useEffect } from "react";


const StaffReports = () => {

  // Fetch Params
  const [staffList, setStaffList] = useState([]);

  // Search Params
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch
  const fetchStaffList = async () => {

    const hotel_id = sessionStorage.getItem('hotel_id');
    try {
      const response = await fetch(`${ApiHost}/api/hotel/staff/management/fetch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'hotel_id': hotel_id }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.returncode === 200 && Array.isArray(result.output)) {
          // Map the output objects to Staff interface
          const mappedStaffList = result.output.map((item) => ({
            id: item.id,
            first_name: item.FirstName,
            last_name: item.LastName,
            contact: item.Contact,
            email: item.Email,
            address: item.Address,
            department_name: item.DepartmentName,
            designation: item.Designation,
            role: item.Role,
            salary: item.Salary,
            incentives: item.Incentive,
          }));
          setStaffList(mappedStaffList);
        } else {
          console.error("Unexpected response format:", result);
        }
      } else {
        console.error("Failed to fetch staff list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchStaffList();
  }, []);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredStaffs = staffList.filter((staff) =>
    staff.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || staff.last_name.toLowerCase().includes(searchQuery.toLowerCase()) || staff.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HotelSideNav />
      <div className={`ml-[70px] flex-1 h-auto p-4 bg-slate-200`}>
        <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Staff Reports</h2>
        <div className="flex justify-between space-x-4 mb-4">
          <div className="">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Name or Contact..."
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>
        </div>

        <div className="flex bg-white p-4 rounded-lg shadow-md mt-5 border-l-4 border-red-500">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-card-foreground text-zinc-500 pb-4">
              Staff Details
            </h2>
            <table className="min-w-full text-black border-collapse">
              <thead>
                <tr className="bg-gray-500 text-white">
                  <th className="border px-4 py-2">SR#</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Contact</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Designation</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredStaffs.map((staff, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-zinc-200 cursor-pointer" : "cursor-pointer"}
                      onClick={() => {
                        sessionStorage.setItem("Staff_Report_Id", staff.id);
                        sessionStorage.setItem("Staff_Report_Name", `${staff.first_name} ${staff.last_name}`);
                        location.href = '/hotels/reports/staff/analysis'
                      }}
                    >
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{staff.first_name} {staff.last_name}</td>
                      <td className="border px-4 py-2">{staff.contact}</td>
                      <td className="border px-4 py-2">{staff.email}</td>
                      <td className="border px-4 py-2">{staff.department_name}</td>
                      <td className="border px-4 py-2">{staff.designation}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div >
      </div>
    </>
  );
};

export default StaffReports;
