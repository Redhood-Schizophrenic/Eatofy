"use client";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Customer {
  id: string;
  customer_name: string;
  contact: string;
  email: string;
  occassion: string;
  date: string;
  hotel_id: string;
}

const CustomerTable: React.FC = () => {

  const hotel_id: any = sessionStorage.getItem('hotel_id');
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    contact: "",
    email: "",
    occassion: "",
    date: "",
    hotel_id: hotel_id
  });

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
          const mappedCustomerList = result.output.map((item: any) => ({
            id: item.id,
            customer_name: item.CustomerName,
            contact: item.Contact,
            email: item.Email,
          }));
          setCustomerList(mappedCustomerList);
          console.log(result)
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
    fetchCustomerList();
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
        const result: Customer = await response.json();
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

  return (
    <>
      <HotelSideNav />
      <div className={`ml-[70px] flex-1 h-screen p-4 bg-white ${isFormVisible ? "" : ""}`}>
        <h2 className="text-red-500 text-3xl mb-4">Customer Relationship Management</h2>

        <div className="flex space-x-4 mb-4">
          <button className="bg-zinc-800 text-white px-4 py-2 rounded">Customers</button>
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
                </tr>
              </thead>
              <tbody>
                {customerList.map((customer, index) => (
                  <tr key={customer.id} className={index % 2 === 0 ? "bg-zinc-200" : ""}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{customer.customer_name}</td>
                    <td className="border px-4 py-2">{customer.contact}</td>
                    <td className="border px-4 py-2">{customer.email}</td>
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
                        <label className="block mb-2 text-black">Customer Name</label>
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
