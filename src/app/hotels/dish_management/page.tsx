'use client';

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { FaTrashCan, FaXmark } from 'react-icons/fa6';

const MenuManagement = () => {

  const [data, setData]: any = useState([]);
  const [dishes, setdishes] = useState([]);
  const [section, setsection] = useState([]);
  const [showaddmenu, setShowaddmenu] = useState(false);
  const [addDish, setaddDish] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [categoryname, setCategoryname] = useState('');
  const [description, setDescription] = useState('');
  const [dishname, setDishname] = useState('');
  const [dishcode, setDishCode] = useState('');
  const [dishtype, setDishType] = useState('');
  const [price, setprice]: any = useState(0);
  const [code, setcode] = useState('');
  const hotel_id = sessionStorage.getItem('hotel_id');

  useEffect(() => {
    fetchCategory();
    fetchDishes();
    fetchSections();
  }, [])

  const fetchCategory = async () => {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/dish/category/fetch`, {
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
        console.log("Data fetched", data);
        setData(data.output);
      } else {
        alert("Unable to fetch Category's");
      }
    } catch (e: any) {
      throw console.error(e);
    }
  }

  const fetchDishes = async () => {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/dish/management/fetch`, {
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
        console.log("Data fetched", data);
        setdishes(data.output);
      } else {
        alert("Unable to fetch Category's");
      }
    } catch (e: any) {
      throw console.error(e);
    }
  }

  const fetchSections = async () => {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/sections/management/fetch`, {
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
        console.log("Data fetched", data);
        setsection(data.output);
      } else {
        alert("Unable to fetch Sections");
      }
    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleCategoryAdd = async (e: any) => {
    e.preventDefault();

    try {

      const response = await fetch(`${ApiHost}/api/hotel/dish/category/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': hotel_id,
          'category_name': categoryname,
          'description': description
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        alert(data.message);
        setisOpen(false);
        fetchCategory();
      } else {
        alert("Failed to Add Category");
      }
    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleDishAdd = async (e: any) => {
    e.preventDefault();

    const category_id = sessionStorage.getItem('category_id_option');

    try {

      const response = await fetch(`${ApiHost}/api/hotel/dish/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': hotel_id,
          'dish_name': dishname,
          'dish_code': dishcode,
          'dish_type': dishtype,
          'category_id': category_id
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        alert(data.message);
        setaddDish(false);
        fetchDishes();
      } else {
        alert("Failed to Add Dish");
      }
    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleCategoryDelete = async () => {

    const category_id = sessionStorage.getItem('category_id');

    try {

      const response = await fetch(`${ApiHost}/api/hotel/dish/category/update/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'category_id': category_id,
          'status': 'Inactive'
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        alert(data.message);
        setisOpen(false);
        fetchCategory();
      } else {
        alert("Failed to delete Category");
      }
    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleDeleteDish = async () => {

    const dish_id = sessionStorage.getItem('dish_id');

    try {

      const response = await fetch(`${ApiHost}/api/hotel/dish/management/update/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'dish_id': dish_id,
          'status': 'Inactive'
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        alert(data.message);
        setShowaddmenu(false);
        fetchDishes();
      } else {
        alert("Failed to delete dish");
      }
    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleAddMenuAll = async (e: any) => {
    e.preventDefault();

    const section_id = sessionStorage.getItem("section_id");
    const dish_id = sessionStorage.getItem("dish_id");

    try {

      const response = await fetch(`${ApiHost}/api/hotel/menu/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'dish_id': dish_id,
          'section_id': section_id,
          'price': price,
          'code': code
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log("Menu", data);
        setShowaddmenu(false);
      } else {
        console.log("failed to fetch")
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleAdd = () => {
    setisOpen(!isOpen);
  }

  const handleAddMenu = () => {
    setShowaddmenu(!showaddmenu);
  }

  const handleAddDish = () => {
    setaddDish(!addDish);
  }

  console.log(dishname, "\n", dishcode, "\n", dishtype)
  console.log("cate_id", sessionStorage.getItem('category_id_option'))

  return (
    <>
      <HotelSideNav />
      {
        isOpen
          ?
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
              <button
                onClick={handleAdd}
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 hover:bg-zinc-300 w-[40px] h-[40px] rounded-full flex justify-center items-center"
              >
                <FaXmark size={20} />
              </button>
              <h2 className="text-lg mb-4">Add Category</h2>
              <form onSubmit={handleCategoryAdd} >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="tablename"
                  >
                    Category name
                  </label>
                  <input
                    type="text"
                    id="categoryname"
                    value={categoryname}
                    onChange={
                      (e) => {
                        setCategoryname(e.target.value);
                      }
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="tablePersons"
                  >
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={
                      (e) => {
                        setDescription(e.target.value);
                      }
                    }
                    id="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Category
                </button>
              </form>
            </div>
          </div>
          :
          <div className="hidden"></div>
      }

      {
        addDish
          ?
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
              <button
                onClick={handleAddDish}
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 hover:bg-zinc-300 w-[40px] h-[40px] rounded-full flex justify-center items-center"
              >
                <FaXmark size={20} />
              </button>
              <h2 className="text-lg mb-4">Add Category</h2>
              <form onSubmit={handleDishAdd} >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dish name"
                  >
                    Dish name
                  </label>
                  <input
                    type="text"
                    id="dishname"
                    value={dishname}
                    onChange={
                      (e) => {
                        setDishname(e.target.value);
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
                    Dish code
                  </label>
                  <input
                    value={dishcode}
                    onChange={
                      (e) => {
                        setDishCode(e.target.value);
                      }
                    }
                    id="dishcode"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dish name"
                  >
                    Dish type
                  </label>
                  <select
                    name="dishtype"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    value={dishtype}
                    onChange={
                      (e) => {
                        setDishType(e.target.value);
                      }
                    }
                  >
                    <option value="">--Select--</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non Veg</option>
                    <option value="Egg">Egg</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dish name"
                  >
                    Category
                  </label>
                  <select id="category" name="category">
                    <option value="">--Select--</option>
                    {
                      data.map((cate: any) => (
                        <option
                          key={cate.id}
                          value={cate.id}
                          onClick={
                            (e) => {
                              const id = e.currentTarget.value;
                              sessionStorage.setItem('category_id_option', id);
                            }
                          }
                        >
                          {cate.CategoryName}
                        </option>
                      ))
                    }
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Category
                </button>
              </form>
            </div>
          </div>
          :
          <div className="hidden"></div>
      }

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
              <h2 className="text-lg mb-4">Add Menu</h2>
              <form onSubmit={handleAddMenuAll} className='w-full'>
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dish name"
                  >
                    Dishes
                  </label>
                  <select className='rounded-lg'>
                    {
                      dishes.map((dish: any) => (
                        <option
                          key={dish.id}
                          value={dish.id}
                          onClick={
                            (e) => {
                              const id = e.currentTarget.value;
                              sessionStorage.setItem('dish_id', id);
                            }
                          }
                        >
                          {dish.DishName}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dish name"
                  >
                    select Section
                  </label>
                  <select className='rounded-lg'>
                    {
                      section.map((items: any) => (
                        <option
                          key={items.id}
                          value={items.id}
                          onClick={
                            (e) => {
                              const id = e.currentTarget.value;
                              sessionStorage.setItem('section_id', id);
                            }
                          }
                        >
                          {items.SectionName}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dish name"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    className='rounded-lg'
                    placeholder='price'
                    value={price}
                    onChange={
                      (e) => {
                        setprice(Number(e.target.value));
                      }
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dish name"
                  >
                    Code
                  </label>
                  <input
                    type="text"
                    className='rounded-lg'
                    placeholder='code'
                    value={code}
                    onChange={
                      (e) => {
                        setcode(e.target.value);
                      }
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Menu
                </button>
              </form>
            </div>
          </div>
          :
          <div className='hidden'></div>
      }

      <div className="ml-[70px] flex-1 p-4">
        <div className=' flex m-6 justify-center'>
          <h1 className="text-2xl  font-bold mb-4">
            Dish <span className="text-red-500">Management</span>
          </h1>
        </div>
        <div className="w-full flex justify-between items-center px-4 py-2">
          <div className="w-full flex items-center gap-4">
            {
              data.map((categorys: any) => (
                <div
                  key={categorys.id}
                  className="inline-flex justify-center items-center gap-4 bg-zinc-200 p-2 rounded-lg"
                >
                  <span>{categorys.CategoryName}</span>
                  <FaTrashAlt
                    size={20}
                    onClick={
                      () => {
                        sessionStorage.setItem('category_id', categorys.id);
                        handleCategoryDelete();
                      }
                    }
                  />
                </div>
              ))
            }
          </div>
          <div
            className="bg-zinc-200 p-2 rounded-lg inline-flex items-center gap-2"
            onClick={handleAdd}
          >
            <span>Add</span>
            <FaPlus size={20} />
          </div>
        </div>
        <hr className="w-[99%] mx-auto border-[1.5px] border-red-500" />
        <div className='w-full mt-2 p-4'>
          <button onClick={handleAddDish} className='bg-zinc-200 text-xl rounded-lg p-2 inline-flex items-center gap-4'>
            <span>add Dish</span>
            <FaPlus size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 m-10 sm:gap-4 ">
          {
            dishes.map((dish: any) => (
              <div
                key={dish.id}
                className={`relative overflow-hidden border rounded-lg bg-white shadow-lg p-4 flex flex-col items-center space-x-4 ${dish.Type === 'Veg' ? 'border-green-500' :
                  dish.Type === 'Non-Veg' ? 'border-red-500' :
                    dish.Type === 'Egg' ? 'border-yellow-500' :
                      'border-gray-500'
                  }`}
              >
                <div
                  className="w-full"
                  onClick={
                    () => {
                      sessionStorage.setItem('dish_id', dish.id);
                      handleDeleteDish();
                    }
                  }
                >
                  <FaTrashCan size={20} />
                </div>

                <span className='absolute top-0 right-0 p-2 font-semibold bg-zinc-200 text-[12px] rounded'>{dish.Code}</span>
                <h2 className="font-bold pt-4">{dish.DishName}</h2>
                <p
                  className={`${dish.Type === 'Veg' ? 'text-green-500' :
                    dish.Type === 'Non-Veg' ? 'text-red-500' :
                      dish.Type === 'Egg' ? 'text-yellow-500' :
                        'text-gray-500'
                    }`}

                > {dish.Type} </p>
                {
                  data.filter((item: any) => item.id === dish.CategoryId)
                    .map((items: any) => (
                      <p key={items.id} className="text-xl">{items.CategoryName}</p>
                    ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default MenuManagement;
