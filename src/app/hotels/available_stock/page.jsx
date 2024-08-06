'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";

export default function Available_stock() {

  const [isLoading, setLoading] = useState(false);
  const [fetchstock, setfetchstock] = useState([]);
  const [fetchitems, setfetchitems] = useState([]);
  const [hotel_id, sethotel_id] = useState('');
  const [ShowTableForm, setShowTableForm] = useState(false);
  const [ShowEditTableForm, setShowEditTableForm] = useState(false);
  const [quantity, setquantity] = useState('');
  const [available_stock_id, set_available_stock_id] = useState('');
  const [unit, setunit] = useState('');
  const [itemId, setitemId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

    } catch (e) {
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

    } catch (e) {
      throw console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    sethotel_id(sessionStorage.getItem('hotel_id'));
    if (hotel_id) {
      fetchItems();
      fetchStock();
    }
  }, [hotel_id]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStock = fetchstock.filter((stock) =>
    stock.Items.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
  );



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

    } catch (e) {
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

    } catch (e) {
      throw console.log(e);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <HotelSideNav />
      {
        <div className="ml-[70px]">
          <h2 className="p-4 text-center w-full bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Available Stock</h2>

          <div className="flex items-center justify-between p-4">
            <div className="">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search item name..."
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
            <div className="">
              <button onClick={() => { setShowTableForm(!ShowTableForm) }} className="text-xl bg-red-500 text-white p-2 rounded-lg m-4 text-right">
                Add Purchase
              </button>
            </div>
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
                            fetchitems.map((items) => (
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
                  filteredStock.map((items) => (
                    <tr key={items.id}>
                      <td className="p-4">{items.Items.Category.CategoryName}</td>
                      <td className="p-4">{items.Items.ItemName}</td>
                      <td className="p-4">{`${items.Quantity} ${items.Unit}`}</td>
                      <td className="p-4">
                        <div className="flex justify-center items-center">
                          <h3
                            className={`text-center px-2 py-1 rounded-lg font-semibold
                                ${(items.Status == "Available" && (Number(items.Quantity) > 20)) ? 'bg-green-200 text-green-500' :
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
