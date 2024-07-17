"use client";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Staff {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  contact: string;
  email: string;
  password: string;
  department_name: string;
  designation: string;
  role: string;
  salary: number;
  incentives: number;
  hotel_id: string;
}

const StaffTable: React.FC = () => {

  const hotel_id:any = sessionStorage.getItem('hotel_id');
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    department_name: "",
    designation: "",
    role: "",
    salary: "",
    incentives: "",
    hotel_id: hotel_id
  });

  const fetchStaffList = async () => {
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
          const mappedStaffList = result.output.map((item: any) => ({
            id: item.id,
            first_name: item.FirstName,
            last_name: item.LastName,
            contact: item.Contact,
            email: item.Email,
            department_name: item.DepartmentName,
            designation: item.Designation,
            role: item.Role,
            salary: item.Salary,
            incentives: item.Incentive,
          }));
          setStaffList(mappedStaffList);
          console.log(result)
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

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newStaff = {
      ...formData,
      salary: parseFloat(formData.salary),
      incentives: parseInt(formData.incentives),
    };

    try {
      const response = await fetch(`${ApiHost}/api/hotel/staff/management/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStaff),
      });

      if (response.ok) {
        const result: Staff = await response.json();
        setStaffList([...staffList, result]);
        setFormData({
          first_name: "",
          last_name: "",
          address: "",
          contact: "",
          email: "",
          password: "",
          department_name: "",
          designation: "",
          role: "",
          salary: "",
          incentives: "",
          hotel_id
        });
        setFormVisible(false);
      } else {
        console.error("Failed to add staff");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <HotelSideNav />
      <div className={`ml-[70px] flex-1 h-screen p-4 bg-white ${isFormVisible ? "" : ""}`}>
        <h2 className="text-red-500 text-3xl mb-4">Staff</h2>

        <div className="flex space-x-4 mb-4">
          <button className="bg-zinc-800 text-white px-4 py-2 rounded">Staff</button>
          <button className="bg-zinc-800 text-white px-4 py-2 rounded" onClick={toggleFormVisibility}>
            Staff Add +
          </button>
        </div>

        <div className="flex">
          <div className="flex-1">
            <table className="min-w-full text-black border-collapse">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="border px-4 py-2">SR#</th>
                  <th className="border px-4 py-2">First Name</th>
                  <th className="border px-4 py-2">Last Name</th>
                  <th className="border px-4 py-2">Contact</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Designation</th>
                  <th className="border px-4 py-2">Salary</th>
                  <th className="border px-4 py-2">Incentives</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff, index) => (
                  <tr key={staff.id} className={index % 2 === 0 ? "bg-zinc-200" : ""}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{staff.first_name}</td>
                    <td className="border px-4 py-2">{staff.last_name}</td>
                    <td className="border px-4 py-2">{staff.contact}</td>
                    <td className="border px-4 py-2">{staff.email}</td>
                    <td className="border px-4 py-2">{staff.department_name}</td>
                    <td className="border px-4 py-2">{staff.designation}</td>
                    <td className="border px-4 py-2">{staff.salary}</td>
                    <td className="border px-4 py-2">{staff.incentives}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isFormVisible && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-60">
              <div className="bg-white p-8 rounded shadow-lg z-10 w-[60%]">
                <h3 className="text-lg font-bold mb-4 text-red-500">Add New Staff</h3>
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-6">
                    <div className="w-1/2">
                      <div className="mb-4">
                        <label className="block mb-2 text-black">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Contact</label>
                        <input
                          type="text"
                          name="contact"
                          value={formData.contact}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Department Name</label>
                        <input
                          type="text"
                          name="department_name"
                          value={formData.department_name}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Role</label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Salary</label>
                        <input
                          type="number"
                          name="salary"
                          value={formData.salary}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Incentives</label>
                        <input
                          type="number"
                          name="incentives"
                          value={formData.incentives}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center gap-6 mt-4">
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded w-full">
                      Add Staff
                    </button>
                    <button
                      type="button"
                      onClick={toggleFormVisibility}
                      className="bg-gray-500 text-white px-4 py-2 rounded w-full"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StaffTable;
