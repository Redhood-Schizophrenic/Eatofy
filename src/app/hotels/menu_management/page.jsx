'use client';

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaTrashCan, FaXmark } from 'react-icons/fa6';
import { MdOutlineModeEdit } from 'react-icons/md';

const MenuManagement = () => {

  const [showaddmenu, setShowaddmenu] = useState(false);
  const [showeditmenu, setShoweditmenu] = useState(false);
  const [Search, setSearch] = useState("");
  const [hotelDishes, setHotelDishes] = useState([]);
  const [displayAllDishes, setdisplayAllDishes] = useState(true);
  const [sectionDishes, setSectionDishes] = useState([]);
  const [sections, setSection] = useState([]);
  const [SuccessMessage, setSuccessMessage] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');

  // Search Dishes
  const handleSearch = (element) => {
    setSearch(element.target.value);
  }

  // Form Elements
  const [DishName, setDishName] = useState('');
  const [CategoryName, setCategoryName] = useState('');
  const [DishCode, setDishCode] = useState("");
  const [DishType, setDishType] = useState('');
  const [Price, setPrice] = useState(0);

  // Fetch Logic
  const SectionFetch = async (section_id) => {

    try {

      const response = await fetch(`${ApiHost}/api/hotel/menu/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'section_id': section_id
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        setSectionDishes(data.output);
      }
    }
    catch (e) {
      throw console.error(e);
    }
  }

  const MenuFetch = async () => {

    try {

      const response = await fetch(`${ApiHost}/api/hotel/menu/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': sessionStorage.getItem('hotel_id')
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        setHotelDishes(data.output[0].Menus);
        setdisplayAllDishes(true);
        setSection(data.output[0].Sections);
      }
    }
    catch (e) {
      throw console.error(e);
    }
  }

  useEffect(() => {


    MenuFetch();
  }, [])

  // Add
  const handleAddMenuAll = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`${ApiHost}/api/hotel/menu/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'dish_name': DishName,
          'dish_code': DishCode,
          'dish_type': DishType,
          'price': Price,
          'category_name': CategoryName,
          'hotel_id': sessionStorage.getItem('hotel_id')
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setSuccessMessage(data.message);
        setShowaddmenu(false);
        hotelDishes();
        location.reload();
      } else {
        setErrorMessage(data.message);
      }

    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  // Edit
  const handleEditMenuAll = async (e) => {
    e.preventDefault();

    const menu_id = sessionStorage.getItem("menu_id");

    try {

      const response = await fetch(`${ApiHost}/api/hotel/menu/management/update/price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'menu_id': menu_id,
          'price': Price
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setSuccessMessage(data.message);
        setShoweditmenu(false);
        hotelDishes();
        location.reload();
      } else {
        setErrorMessage(data.message);
      }

    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  // Delete
  const handleDeleteMenu = async () => {

    const menu_id = sessionStorage.getItem("menu_id");

    try {

      const response = await fetch(`${ApiHost}/api/hotel/menu/management/update/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'menu_id': menu_id,
          'status': "Inactive"
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setSuccessMessage(data.message);
        setShoweditmenu(false);
        hotelDishes();
        location.reload();
      } else {
        setErrorMessage(data.message);
      }

    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  const handleAddMenu = () => {
    setShowaddmenu(!showaddmenu);
    setDishName('');
    setCategoryName('');
    setDishCode("");
    setDishType('');
    setPrice(0);
  }

  const handleEditMenu = () => {
    setShoweditmenu(!showeditmenu);
    setPrice(0);
  }

  return (
    <>
      <HotelSideNav />
      {
        // Edit
        showeditmenu
          ?
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {
              SuccessMessage === "" && ErrorMessage !== "" ? (
                <div className='text-red-500 p-4 flex items-center justify-center font-semibold text-3xl bg-red-200 border-t-8 border-red-500 rounded-xl'>
                  <h1>{ErrorMessage}</h1>
                </div>
              ) : SuccessMessage !== "" && ErrorMessage !== "" ? (
                <div className='text-green-500 p-4 flex items-center justify-center font-semibold text-3xl bg-green-200 border-t-8 border-green-500 rounded-xl'>
                  <h1>{SuccessMessage}</h1>
                </div>
              ) : (
                <div className='hidden'></div>
              )
            }

            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
              <button
                onClick={handleEditMenu}
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 hover:bg-zinc-300 w-[40px] h-[40px] rounded-full flex justify-center items-center"
              >
                <FaXmark size={20} />
              </button>

              <div className='text-green-500 pb-4 flex items-center justify-center font-semibold'>
                <h1>{SuccessMessage}</h1>
              </div>
              <div className='text-red-500 pb-4 flex items-center justify-center font-semibold'>
                <h1>{ErrorMessage}</h1>
              </div>

              <h2 className="text-lg mb-4">Edit Price</h2>
              <form onSubmit={handleEditMenuAll} className='w-full'>
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    className='rounded-lg'
                    placeholder='Price'
                    value={Price}
                    onChange={
                      (e) => {
                        setPrice(Number(e.target.value));
                      }
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Edit
                </button>
              </form>
            </div>
          </div>
          :
          <div className='hidden'></div>
      }
      {
        // Add
        showaddmenu
          ?
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">

            {
              SuccessMessage === "" && ErrorMessage !== "" ? (
                <div className='text-red-500 p-4 flex items-center justify-center font-semibold text-3xl bg-red-200 border-t-8 border-red-500 rounded-xl'>
                  <h1>{ErrorMessage}</h1>
                </div>
              ) : SuccessMessage !== "" && ErrorMessage !== "" ? (
                <div className='text-green-500 p-4 flex items-center justify-center font-semibold text-3xl bg-green-200 border-t-8 border-green-500 rounded-xl'>
                  <h1>{SuccessMessage}</h1>
                </div>
              ) : (
                <div className='hidden'></div>
              )
            }

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
                    Dish Name
                  </label>
                  <input
                    type="text"
                    className='rounded-lg w-full'
                    placeholder='eg; Paneer Chilly'
                    value={DishName}
                    onChange={
                      (e) => {
                        setDishName((e.target.value));
                      }
                    }
                    required
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dish_code"
                  >
                    Dish Code
                  </label>
                  <input
                    type="text"
                    className='rounded-lg w-full'
                    placeholder='Dish Code'
                    value={DishCode}
                    onChange={
                      (e) => {
                        setDishCode((e.target.value));
                      }
                    }
                    required
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dish_type"
                  >
                    Dish Type
                  </label>
                  <input
                    type="text"
                    className='rounded-lg w-full'
                    placeholder='Veg / Non-Veg/ Egg / Beverages'
                    value={DishType}
                    onChange={
                      (e) => {
                        setDishType(e.target.value);
                      }
                    }
                    required
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category_name"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    className='rounded-lg w-full'
                    placeholder='eg; Starter'
                    value={CategoryName}
                    onChange={
                      (e) => {
                        setCategoryName(e.target.value);
                      }
                    }
                    required
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    className='rounded-lg w-full'
                    placeholder='Price'
                    value={Price}
                    onChange={
                      (e) => {
                        setPrice(Number(e.target.value));
                      }
                    }
                    required
                  />
                </div>
                <div className='w-full flex items-center justify-center'>
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-md"
                  >
                    Add Menu
                  </button>
                </div>
              </form>
            </div>
          </div>
          :
          <div className='hidden'></div>
      }

      <div className="ml-[70px] flex-1 p-4">
        <div className='flex m-6 justify-center gap-2 flex-col'>
          <div className='flex justify-between'>
            <h1 className="text-3xl  font-bold mb-4">
              Menu <span className="text-red-500">Management</span>
            </h1>
            <div>
              <input
                type="text"
                className="rounded-lg text-sm bg-white text-black"
                placeholder="Search by name or code"
                value={Search}
                onChange={handleSearch}
              />
            </div>
          </div>
          {
            SuccessMessage === "" && ErrorMessage !== "" ? (
              <div className='text-red-500 p-4 flex items-center justify-center font-semibold text-3xl bg-red-200 border-t-8 border-red-500 rounded-xl'>
                <h1>{ErrorMessage}</h1>
              </div>
            ) : SuccessMessage !== "" && ErrorMessage !== "" ? (
              <div className='text-green-500 p-4 flex items-center justify-center font-semibold text-3xl bg-green-200 border-t-8 border-green-500 rounded-xl'>
                <h1>{SuccessMessage}</h1>
              </div>
            ) : (
              <div className='hidden'></div>
            )
          }
        </div>
        <div className="w-full flex justify-between items-center px-4 py-2">
          <div className="w-full flex items-center gap-4">
            <div
              onClick={
                () => {
                  SectionFetch();
                  setdisplayAllDishes(true);
                }
              }
              className="inline-flex justify-center items-center gap-4 font-semibold p-2 rounded-lg"
            >
              <span>All Dishes</span>
            </div>
            {
              sections.map((section) => (
                <div
                  key={section.id}
                  onClick={
                    () => {
                      sessionStorage.setItem('section_id', section.id);
                      SectionFetch(section.id);
                      setdisplayAllDishes(false);
                    }
                  }
                  className="inline-flex justify-center items-center gap-4 font-semibold p-2 rounded-lg"
                >
                  <span>{section.SectionName}</span>
                </div>
              ))
            }
          </div>
        </div>
        <hr className="w-[99%] mx-auto border-[1.5px] border-red-500" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 m-10 sm:gap-4 ">
          {
            displayAllDishes
              ?

              hotelDishes.filter((menu) => {
                const searchMatch = menu.Dish.DishName.toLowerCase().includes(Search.toLowerCase()) || menu.Dish.Code.toLowerCase().includes(Search.toLowerCase());
                return searchMatch;
              })
              .map((dish) => (
                  <div
                    key={dish.id}
                    className={`relative overflow-hidden border rounded-lg bg-white shadow-lg p-12 flex flex-col items-center space-x-4 
                    ${dish.Dish.Type.startsWith('V') ? 'border-green-500' :
                        dish.Dish.Type.startsWith('N') ? 'border-red-500' :
                          dish.Dish.Type.startsWith('E') ? 'border-yellow-500' :
                            dish.Dish.Type.startsWith('B') ? 'border-blue-500' :
                              'border-gray-500'
                      }`}
                  >
                    <span className='absolute top-0 right-0 p-2 font-semibold bg-zinc-200 text-[12px] rounded-md'>&#35;{dish.Dish.Code}</span>
                    <span className='absolute top-0 left-0 font-semibold bg-yellow-200 text-yellow-500 border border-yellow-500 px-2 py-1 rounded-md'>
                      {dish.Dish.Category.CategoryName}
                    </span>

                    <h2 className="font-bold pt-4">{dish.Dish.DishName}</h2>
                    <p
                      className={`${dish.Dish.Type.startsWith('V') ? 'text-green-500' :
                        dish.Dish.Type.startsWith('N') ? 'text-red-500' :
                          dish.Dish.Type.startsWith('E') ? 'text-yellow-500' :
                            dish.Dish.Type.startsWith('B') ? 'text-blue-500' :
                              'text-gray-500'
                        }`}
                    >
                      {dish.Dish.Type}
                    </p>
                    <p>Rs.{dish.Price}</p>
                    <p className='text-sm font-bold text-gray-700'>Section:- {dish.Section.SectionName}</p>
                  </div>
                ))

              :
              sectionDishes
              .filter((menu) => {
                const searchMatch = menu.Dish.DishName.toLowerCase().includes(Search.toLowerCase()) || menu.Dish.Code.toLowerCase().includes(Search.toLowerCase());
                return searchMatch;
              })
              .map((dish) => (
                <div
                  key={dish.id}
                  className={`relative overflow-hidden border rounded-lg bg-white shadow-lg p-8 flex flex-col items-center space-x-4 
                    ${dish.Dish.Type.startsWith('V') ? 'border-green-500' :
                      dish.Dish.Type.startsWith('N') ? 'border-red-500' :
                        dish.Dish.Type.startsWith('E') ? 'border-yellow-500' :
                          dish.Dish.Type.startsWith('B') ? 'border-blue-500' :
                            'border-gray-500'
                    }`}
                >
                  <div
                    className="w-full absolute top-2 left-2"
                    onClick={
                      () => {
                        sessionStorage.setItem('menu_id', dish.id);
                        handleDeleteMenu();
                      }
                    }
                  >
                    <FaTrashCan size={20} />
                  </div>

                  <span
                    className='absolute top-2 right-2 rounded-md'
                    onClick={
                      () => {
                        sessionStorage.setItem('menu_id', dish.id);
                        setShoweditmenu(true);
                      }
                    }
                  >
                    <MdOutlineModeEdit size={25} />
                  </span>

                  <h2 className="font-bold pt-4">{dish.Dish.DishName}</h2>
                  <p
                    className={`${dish.Dish.Type.startsWith('V') ? 'text-green-500' :
                      dish.Dish.Type.startsWith('N') ? 'text-red-500' :
                        dish.Dish.Type.startsWith('E') ? 'text-yellow-500' :
                          dish.Dish.Type.startsWith('B') ? 'text-blue-500' :
                            'text-gray-500'
                      }`}

                  > {dish.Dish.Type} </p>
                  <p>Rs.{dish.Price}</p>

                  <div className='inline-flex gap-2 justify-between items-center w-full pt-2'>
                    <span className='w-2/3 font-semibold bg-yellow-200 text-yellow-500 border border-yellow-500 px-2 py-1 rounded-md flex justify-center items-center'>
                      {dish.Dish.Category.CategoryName}
                    </span>
                    <span className='w-1/3 p-2 font-semibold bg-zinc-200 text-[12px] rounded-md flex justify-center items-center'>
                      &#35; {dish.Dish.Code}
                    </span>
                  </div>
                </div>
              ))
          }
        </div>
        <div className="flex left-[50%] translate-[-50%] justify-center mt-6">
          <button
            onClick={handleAddMenu}
            className="bg-red-500 fixed bottom-5 text-primary-foreground px-4 py-2 rounded-full flex items-center justify-center space-x-2">
            <span>Click To Add Menu</span>
            <FaPlus size={25} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuManagement;
