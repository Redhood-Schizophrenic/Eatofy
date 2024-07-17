'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function Supplier_management() {

  const [supplier, setsupplier]:any = useState([]);
  const [supplier_name, setsupplier_name] = useState('');
  const [contact, setcontact] = useState('');
  const [email, setemail] = useState('');
  const [gstin, setgstin] = useState('');
  const [showaddmenu, setShowaddmenu] = useState(false);
  const hotel_id = sessionStorage.getItem('hotel_id');

  useEffect(()=>{
    fetchSuppliers();
  },[]);

  const fetchSuppliers = async ()=>{
    try {
      
      const response = await fetch(`${ApiHost}/api/hotel/suppliers/management/fetch`,{
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
        console.log("Suppliers Fetched", data);
        setsupplier(data.output);
        console.log(supplier)
      }else{
        alert("Failed to fetch Suppliers data");
      }
    } catch (e:any) {
      throw console.error(e);
    }
  }
  
  const handleAddSupplier = async (e: any) => {
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
          'gstin': gstin 
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        alert(data.message);
        setShowaddmenu(false);
        fetchSuppliers();
      } else {
        alert("Failed to Add Supplier");
      }
    } catch (e: any) {
      throw console.error(e);
    }
  }
  
  const handleAddMenu = () => {
    setShowaddmenu(!showaddmenu);
  }

  return(
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
              <h2 className="text-lg mb-4">Add Category</h2>
              <form onSubmit={handleAddSupplier}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dish name"
                  >
                    Supplier name
                  </label>
                  <input
                    type="text"
                    id="suppliername"
                    value={supplier_name}
                    onChange={
                      (e)=>{
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
                    htmlFor="dish code"
                  >
                    Contact
                  </label>
                  <input
                    id="contact"
                    value={contact}
                    onChange={
                      (e)=>{
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
                    htmlFor="dish name"
                  >
                    email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={
                      (e)=>{
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
                    htmlFor="dish name"
                  >
                    Gstin no
                  </label>
                  <input
                    type="text"
                    id="gstin"
                    value={gstin}
                    onChange={
                      (e)=>{
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
          <h1 className="text-2xl text-red-500 font-bold my-4">Supplier Management</h1>
        </div>
        <div className="flex justify-between items-center">
          <button onClick={handleAddMenu} className="bg-red-500 inline-flex justify-center items-center gap-4 p-2 rounded-lg">
            Add <FaPlus size={20} />
          </button>
          <div>
            <input 
              type="text"
              placeholder="Filter"
              className="rounded-lg focus:outline-none focus:ring-white"
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
                    <div>Contact</div>
                  </th>
                  <th className='border p-2'>
                    <div>Email Address</div>
                  </th>
                  <th className='border p-2'>
                    <div>GSTIN</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  supplier?.map((items: any) => (
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
