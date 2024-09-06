"use client";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useState, useEffect } from "react";

const CustomerTable = () => {

  const [hotel_id, sethotel_id] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    contact: "",
    email: "",
    occassion: "",
    date: "",
    hotel_id: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCustomerList = async () => {
    try {
      const response = await fetch(`${ApiHost}/api/hotel/customers/management/fetch`, {
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
          const mappedCustomerList = result.output.map((item) => ({
            id: item.id,
            customer_name: item.CustomerName,
            contact: item.Contact,
            email: item.Email,
            occassion: item.CustomerOccassion[0]?.Occassion || "N/A",
            date: item.CustomerOccassion[0]?.Date || "N/A"
          }));
          setCustomerList(mappedCustomerList);
        } else {
          console.error("Unexpected response format:", result);
        }
      } else {
        console.error("Failed to fetch customer list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const hotelId = sessionStorage.getItem('hotel_id');
    sethotel_id(hotelId);
    if (hotel_id){
      fetchCustomerList();
    }
  }, [hotel_id]);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      hotel_id: hotel_id
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCustomer = {
      ...formData,
    };

    try {
      const response = await fetch(`${ApiHost}/api/hotel/customers/management/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer)
      });

      if (response.ok) {
        const result = await response.json();
        setCustomerList([...customerList, result]);
        setFormData({
          customer_name: "",
          contact: "",
          email: "",
          occassion: "",
          date: "",
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customerList.filter((customer) =>
    customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) || customer.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HotelSideNav />
      <div className={`ml-[70px] flex-1 h-screen p-4 bg-white ${isFormVisible ? "" : ""}`}>
            <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Customer Relationship Management</h2>

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
          <button className="bg-zinc-800 text-white px-4 py-2 rounded" onClick={toggleFormVisibility}>
            Add +
          </button>
        </div>

        <div className="flex">
          <div className="flex-1">
            <table className="min-w-full text-black border-collapse">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="border px-4 py-2">SR#</th>
                  <th className="border px-4 py-2">Customer Name</th>
                  <th className="border px-4 py-2">Contact</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Occassion</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredCustomers.map((customer, index) => (
                  <tr key={customer.id} className={index % 2 === 0 ? "bg-zinc-200" : ""}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{customer.customer_name}</td>
                    <td className="border px-4 py-2">{customer.contact}</td>
                    <td className="border px-4 py-2">{customer.email}</td>
                    <td className="border px-4 py-2">{customer.occassion}</td>
                    <td className="border px-4 py-2">{customer.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isFormVisible && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-60">
              <div className="bg-white p-8 rounded shadow-lg z-10 w-[60%]">
                <h3 className="text-lg font-bold mb-4 text-red-500 text-center">Add New Customer</h3>
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-6 justify-center">
                    <div className="w-1/2">
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Customer Name<span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="customer_name"
                          value={formData.customer_name}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Contact<span className="text-red-500">*</span></label>
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
                        <label className="block mb-2 text-black">Occassion</label>
                        <input
                          type="text"
                          name="occassion"
                          value={formData.occassion}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-black">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="border rounded px-4 py-2 text-black border-red-500 w-full"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center gap-6 mt-4">
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded w-full">
                      Add Customer
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
        </div >
      </div >
    </>
  );
};

export default CustomerTable;
