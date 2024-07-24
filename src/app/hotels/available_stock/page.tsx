'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";

export default function Available_stock() {

  const [isLoading, setLoading] = useState(false);
  const [fetchstock, setfetchstock]: any = useState([]);
  const [fetchitems, setfetchitems]: any = useState([]);
  const [ShowTableForm, setShowTableForm] = useState(false);
  const [ShowEditTableForm, setShowEditTableForm] = useState(false);
  const hotel_id = sessionStorage.getItem('hotel_id');
  const [quantity, setquantity]: any = useState('');
  const [available_stock_id, set_available_stock_id]: any = useState('');
  const [unit, setunit]: any = useState('');
  const [itemId, setitemId]: any = useState('');

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${ApiHost}/api/hotel/inventory/items/management/fetch`, {
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
        setfetchitems(data.output);
      } else {
        console.log("Failed to fetch");
      }

    } catch (e: any) {
      throw console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const fetchStock = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${ApiHost}/api/hotel/inventory/available_stock/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': hotel_id,
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setfetchstock(data.output);
      } else {
        console.log("Failed to fetch");
      }

    } catch (e: any) {
      throw console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
    fetchStock();
  }, []);



  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${ApiHost}/api/hotel/inventory/available_stock/management/update/quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'available_stock_id': available_stock_id,
          'quantity': quantity
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        fetchStock();
        setShowEditTableForm(false);
      } else {
        console.log("Failed to fetch");
      }

    } catch (e: any) {
      throw console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${ApiHost}/api/hotel/inventory/available_stock/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': hotel_id,
          'item_id': itemId,
          'quantity': quantity,
          'unit': unit
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        fetchStock();
        setShowTableForm(false);
      } else {
        console.log("Failed to fetch");
      }

    } catch (e: any) {
      throw console.log(e);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <HotelSideNav />
      {
        isLoading
          ?
          <div aria-label="Loading..." role="status" className="flex justify-center items-center w-full h-screen">
            <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
              <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="24"></line>
              <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="24"></line>
              <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="24"></line>
              <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
            </svg>
            <span className="text-4xl font-medium text-gray-500">Loading...</span>
          </div>
          :
          <div className="ml-[70px]">
            <div className="text-right">
              <h1 className="text-3xl text-red-500 text-center my-1 mt-6">Available Stock</h1>
              <button onClick={() => { setShowTableForm(!ShowTableForm) }} className="text-xl bg-red-500 text-white p-2 rounded-lg m-4 text-right">
                Add Purchase
              </button>
            </div>
            {ShowTableForm ?
              <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-1/2 relative">
                  <button
                    onClick={() => { setShowTableForm(!ShowTableForm) }}
                    className="absolute top-2 right-2 p-2 text-gray-500 rounded-full hover:bg-zinc-200 hover:text-gray-700"
                  >
                    <FaXmark size={20} />
                  </button>
                  <h2 className="text-lg mb-4">Add Stock</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between gap-6 flex-col">
                      <div className="w-full">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor=""
                          >
                            Select Item
                          </label>
                          <select
                            className="rounded-lg w-full"
                            value={itemId}
                            onChange={(e) => {
                              e.preventDefault();
                              setitemId(e.target.value);
                            }}
                          >
                            <option value="">-- Select --</option>
                            {
                              fetchitems.map((items: any) => (
                                <option key={items.id} value={items.id}>{items.ItemName}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                      <div className="w-full flex gap-4">
                        <div className="w-1/2 mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="quantity"
                          >
                            Quantity
                          </label>
                          <input
                            type="text"
                            value={quantity}
                            placeholder="eg; 10"
                            onChange={(e) => {
                              e.preventDefault();
                              setquantity(e.target.value);
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                        <div className="w-1/2 mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="unit"
                          >
                            Unit
                          </label>
                          <input
                            type="text"
                            value={unit}
                            placeholder="eg; KG, LTR, etc."
                            onChange={(e) => {
                              e.preventDefault();
                              setunit(e.target.value);
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </div>
              :
              <div className="hidden"></div>
            }

            {ShowEditTableForm ?
              <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-1/2 relative">
                  <button
                    onClick={() => { setShowEditTableForm(!ShowEditTableForm) }}
                    className="absolute top-2 right-2 p-2 text-gray-500 rounded-full hover:bg-zinc-200 hover:text-gray-700"
                  >
                    <FaXmark size={20} />
                  </button>
                  <h2 className="text-lg mb-4">Edit Stock</h2>
                  <form onSubmit={handleUpdate}>
                    <div className="flex items-center justify-between gap-6 flex-col">
                      <div className="w-full">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="quantity"
                          >
                            Quantity
                          </label>
                          <input
                            type="text"
                            value={quantity}
                            placeholder="eg; 10"
                            onChange={(e) => {
                              e.preventDefault();
                              setquantity(e.target.value);
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </button>
                  </form>
                </div>
              </div>
              :
              <div className="hidden"></div>
            }
            <div className="w-full p-4">
              <table className="table-fixed w-full p-2">
                <thead className="bg-red-500 text-white text-center">
                  <tr>
                    <th className="p-4">Category</th>
                    <th className="p-4">Item</th>
                    <th className="p-4">QTY</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {
                    fetchstock.map((items: any) => (
                      <tr key={items.id}>
                        <td className="p-4">{items.Items.Category.CategoryName}</td>
                        <td className="p-4">{items.Items.ItemName}</td>
                        <td className="p-4">{`${items.Quantity} ${items.Unit}`}</td>
                        <td className="p-4">
                          <div className="flex justify-center items-center">
                            <h3
                              className={`text-center px-2 py-1 rounded-lg font-semibold
                                ${( items.Status == "Available" && (Number(items.Quantity) > 20 )) ? 'bg-green-200 text-green-500' :
                                (Number(items.Quantity) == 0) ? 'bg-red-200 text-red-500' :
                                  (Number(items.Quantity) < 20) ? 'bg-yellow-200 text-yellow-500' :
                                    'border-gray-500'
                                }`}
                            >
                              {items.Status}
                            </h3>
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-4 justify-center">
                            <button
                              onClick={
                                () => {
                                  set_available_stock_id(items.id);
                                  setShowEditTableForm(true);
                                }
                              }
                            >
                              <MdOutlineEdit size={25} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
      }
    </>
  )
}
