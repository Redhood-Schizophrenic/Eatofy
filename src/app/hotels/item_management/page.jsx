'use client';

import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function Item_management() {

  const [isLoading, setLoading] = useState(false);
  const [showTableForm, setShowTableForm] = useState(false);
  const [fetcedcategory, setfetcedcategory] = useState([]);
  const [items, setitems] = useState([]);
  const [item_name, setitem_name] = useState('');
  // const [category_id, setcategory_id] = useState('');
  const [addcategory, setAddCategory] = useState('');
  const [description, setdescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [hotel_id, sethotel_id] = useState('');

  useEffect(() => {
    sethotel_id(sessionStorage.getItem('hotel_id'));
    if (hotel_id) {
      fetchItemCategory();
      fetchItems();
    }
  }, [hotel_id]);

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
        setfetcedcategory(data.output);
      } else {
        alert('Failed to fetch');
      }

    } catch (e) {
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
        setitems(data.output);
      } else {
        alert('Failed to fetch');
      }

    } catch (e) {
      throw console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleAddCategory = async (e) => {
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
        setShowTableForm(false);
        fetchItemCategory();
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  const handleAddItems = async (e) => {
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
        fetchItems();
      } else {
        alert("Failed to add item");
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HotelSideNav />
      {
        <div className="ml-[70px]">
          <h2 className="pt-4 w-full text-center bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Item Management</h2>
          <div className="flex items-center justify-between p-4">
            <div className="">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Item Name..."
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
            <div className="">
              <button onClick={() => { setShowTableForm(!showTableForm) }} className="text-xl bg-black text-white p-2 rounded-lg text-right">
                Add Category
              </button>
            </div>
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
                  <label htmlFor="category" className="text-xl">Category<span className="text-red-500">*</span></label>
                  <select
                    id="category"
                    name="raw materials"
                    className="w-full rounded-lg"
                    required
                  >
                    <option value="">-- Select --</option>
                    {
                      fetcedcategory.map((items) => (
                        <option key={items.id} value={items.id} onClick={() => { sessionStorage.setItem('category_id', items.id) }}>{items.CategoryName}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="w-full">
                  <label htmlFor="itemname" className="text-xl">Item name<span className="text-red-500">*</span></label>
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
                    filteredItems.map((items) => (
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
