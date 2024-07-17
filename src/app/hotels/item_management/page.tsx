'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function Item_management() {

  const [isLoading, setLoading]: any = useState(false);
  const [showTableForm, setShowTableForm] = useState<boolean>(false);
  const [fetcedcategory, setfetcedcategory] = useState([]);
  const [items, setitems] = useState([]);
  const [item_name, setitem_name] = useState('');
  // const [category_id, setcategory_id] = useState('');
  const [addcategory, setAddCategory] = useState<string>('');
  const [description, setdescription] = useState('');
  const hotel_id = sessionStorage.getItem('hotel_id');

  useEffect(() => {
    fetchItemCategory();
    fetchItems();
  }, []);

  const handleCloseTableForm = () => {
    setShowTableForm(false);
  };

  const fetchItemCategory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${ApiHost}/api/hotel/inventory/item_categories/management/fetch`, {
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
        console.log("fetched", data)
        setfetcedcategory(data.output);
      } else {
        console.log('Failed to fetch');
      }

    } catch (e: any) {
      throw console.error(e);
    } finally {
      setLoading(false);
    }
  }

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
        console.log("fetched", data)
        setitems(data.output);
      } else {
        console.log('Failed to fetch');
      }

    } catch (e: any) {
      throw console.error(e);
    } finally{
      setLoading(false);
    }
  }

  const handleAddCategory = async (e: any) => {
    e.preventDefault();

    try {

      const response = await fetch(`${ApiHost}/api/hotel/inventory/item_categories/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'category_name': addcategory,
          'hotel_id': hotel_id
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log(data);
        setShowTableForm(false);
        fetchItemCategory();
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleAddItems = async (e: any) => {
    e.preventDefault();

    const category_id = sessionStorage.getItem('category_id');

    try {

      const response = await fetch(`${ApiHost}/api/hotel/inventory/items/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'category_id': category_id,
          'item_name': item_name,
          'hotel_id': hotel_id,
          'description': description
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log(data);
        fetchItems();
      } else {
        console.log("Failed to add item");
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  console.log(addcategory, " category_id", sessionStorage.getItem('category_id'));
  console.log(item_name);

  return (
    <>
      <HotelSideNav />
      {
        isLoading
          ?
          <div aria-label="Loading..." role="status" className="flex justify-center items-center w-full h-screen">
            <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
              <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
            </svg>
            <span className="text-4xl font-medium text-gray-500">Loading...</span>
          </div>
          :
          <div className="ml-[70px]">
            <div className="text-right">
              <h1 className="text-3xl text-red-500 text-center my-1 mt-6">Item Management</h1>
              <button onClick={() => { setShowTableForm(!showTableForm) }} className="text-xl bg-black text-white p-2 rounded-lg m-4 text-right">
                Add Category
              </button>
            </div>

            {showTableForm ?
              <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                  <button
                    onClick={handleCloseTableForm}
                    className="absolute top-2 right-2 p-2 text-gray-500 rounded-full hover:bg-zinc-200 hover:text-gray-700"
                  >
                    <FaXmark size={20} />
                  </button>
                  <h2 className="text-lg mb-4">Add a Category</h2>
                  <form onSubmit={handleAddCategory}>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="Category"
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        id="addcategory"
                        value={addcategory}
                        onChange={
                          (e) => {
                            setAddCategory(e.target.value)
                          }
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add Category
                    </button>
                  </form>
                </div>
              </div>
              :
              <div className="hidden"></div>
            }
            <hr />
            <div className="flex justify-between items-start h-auto">
              <div className="w-[30%] p-4">
                <form onSubmit={handleAddItems} className="h-auto flex flex-col gap-8 justify-between items-center p-4 border-zinc-400 border rounded-lg">
                  <div className="w-full">
                    <label htmlFor="category" className="text-xl">Category</label>
                    <select
                      id="category"
                      name="raw materials"
                      className="w-full rounded-lg"
                    >
                      {
                        fetcedcategory.map((items: any) => (
                          <option key={items.id} value={items.id} onClick={() => { sessionStorage.setItem('category_id', items.id) }}>{items.CategoryName}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="w-full">
                    <label htmlFor="itemname" className="text-xl">Item name</label>
                    <input
                      type="text"
                      required
                      onChange={
                        (e) => {
                          setitem_name(e.target.value);
                        }
                      }
                      className="w-full focus:outline-none p-2 text-xl rounded-lg"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="description" className="text-xl">Description</label>
                    <textarea
                      id="description"
                      className="w-full text-xl rounded-lg"
                      onChange={
                        (e) => {
                          setdescription(e.target.value);
                        }
                      }
                    ></textarea>
                  </div>
                  <div className="w-full text-center">
                    <button className="bg-black text-white text-xl p-2 rounded-lg">
                      Add Item
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-[70%] p-4">
                <table className="table-auto w-full">
                  <thead className="text-left bg-red-500 text-white">
                    <tr className="p-2">
                      <th className="p-2">Category</th>
                      <th className="p-2">Item name</th>
                      <th className="p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-zinc-100">
                    {
                      items.map((items: any) => (
                        <tr key={items.id} className="p-2">
                          <td className="p-2">{items.Category.CategoryName}</td>
                          <td className="p-2">{items.ItemName}</td>
                          <td className="p-2">{items.Description}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      }
    </>
  )
}
