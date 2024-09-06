'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function Supplier_management() {

  const [suppliers, setsupplier] = useState([]);
  const [supplier_name, setsupplier_name] = useState('');
  const [contact, setcontact] = useState('');
  const [email, setemail] = useState('');
  const [gstin, setgstin] = useState('');
  const [address, setaddress] = useState('');
  const [supplier_type, setsupplier_type] = useState('');
  const [showaddmenu, setShowaddmenu] = useState(false);
  const [hotel_id, sethotel_id] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    sethotel_id(sessionStorage.getItem('hotel_id'));
    if (hotel_id) {
      fetchSuppliers();
    }
  }, [hotel_id]);

  const fetchSuppliers = async () => {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/suppliers/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': hotel_id
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        setsupplier(data.output);
      } else {
        alert("Failed to fetch Suppliers data");
      }
    } catch (e) {
      throw console.error(e);
    }
  }

  const handleAddSupplier = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`${ApiHost}/api/hotel/suppliers/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': hotel_id,
          'supplier_name': supplier_name,
          'contact': contact,
          'email': email,
          'gstin': gstin,
          'supplier_type': supplier_type,
          'address': address
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        alert(data.message);
        setShowaddmenu(false);
        fetchSuppliers();
      } else {
        alert(data.message)
        // alert("Failed to Add Supplier");
      }
    } catch (e) {
      throw console.error(e);
    }
  }

  const handleAddMenu = () => {
    setsupplier_name('');
    setcontact('');
    setemail('');
    setgstin('');
    setShowaddmenu(!showaddmenu);
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.SupplierName.toLowerCase().includes(searchQuery.toLowerCase()) || supplier.Contact.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <HotelSideNav />
      {
        showaddmenu
          ?
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
              <button
                onClick={handleAddMenu}
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 hover:bg-zinc-300 w-[40px] h-[40px] rounded-full flex justify-center items-center"
              >
                <FaXmark size={20} />
              </button>
              <h2 className="text-lg mb-4 font-bold">Add Supplier</h2>
              <form onSubmit={handleAddSupplier}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="suppliername"
                  >
                    Supplier name
                  </label>
                  <input
                    type="text"
                    id="suppliername"
                    placeholder="Supplier Name"
                    value={supplier_name}
                    onChange={
                      (e) => {
                        setsupplier_name(e.target.value)
                      }
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="supplier_type"
                  >
                    Supplier Type
                  </label>
                  <input
                    type="text"
                    id="supplier_type"
                    value={supplier_type}
                    placeholder="eg; Groceries, Beverages, etc."
                    onChange={
                      (e) => {
                        setsupplier_type(e.target.value)
                      }
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="contact"
                  >
                    Contact
                  </label>
                  <input
                    id="contact"
                    value={contact}
                    type="number"
                    placeholder="1234567890"
                    onChange={
                      (e) => {
                        setcontact(e.target.value)
                      }
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    value={address}
                    type="text"
                    placeholder="Address"
                    onChange={
                      (e) => {
                        setaddress(e.target.value)
                      }
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Email"
                    onChange={
                      (e) => {
                        setemail(e.target.value)
                      }
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="gstin"
                  >
                    GSTIN No
                  </label>
                  <input
                    type="text"
                    minLength={15}
                    maxLength={15}
                    id="gstin"
                    value={gstin}
                    placeholder="GST In"
                    onChange={
                      (e) => {
                        setgstin(e.target.value)
                      }
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Supplier
                </button>
              </form>
            </div>
          </div>
          :
          <div className="hidden"></div>
      }
      <div className="ml-[70px] px-4">
        <div className="flex justify-center items-center p-4">
          <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Supplier Management</h2>
        </div>
        <div className="flex justify-between items-center">
          <button onClick={handleAddMenu} className="bg-red-500 font-semibold inline-flex justify-center items-center gap-4 p-2 rounded-lg">
            Add <FaPlus size={20} />
          </button>
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

        <div className="my-6">
          <table className="min-w-full border-collapse rounded-lg table-auto">
            <thead>
              <tr className="bg-zinc-200 text-left">
                <th className='border p-2'>
                  <div>Name</div>
                </th>
                <th className='border p-2'>
                  <div>Supplier Type</div>
                </th>
                <th className='border p-2'>
                  <div>Contact</div>
                </th>
                <th className='border p-2'>
                  <div>Email Address</div>
                </th>
                <th className='border p-2'>
                  <div>GSTIN</div>
                </th>
                <th className='border p-2'>
                  <div>Address</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                filteredSuppliers?.map((items) => (
                  <tr key={items.id}>
                    <td className="p-2">
                      <div className="flex flex-col sm:flex-row items-center">
                        {
                          <span>{items.SupplierName}</span>
                        }
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col sm:flex-row items-center">
                        {
                            <span>{items.SupplierType}</span>
                        }
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col sm:flex-row items-center">
                        {
                          <span>{items.Contact}</span>
                        }
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col sm:flex-row items-center">
                        {
                          <span>{items.Email}</span>
                        }
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col sm:flex-row items-center">
                        {
                          <span>{items.GSTIN}</span>
                        }
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col sm:flex-row items-center">
                        {
                          <span>{items.Address}</span>
                        }
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
