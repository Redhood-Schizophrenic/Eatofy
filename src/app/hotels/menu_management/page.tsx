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
  const [dishname, setDishname] = useState('');
  const [dishcode, setDishCode] = useState('');
  const [dishtype, setDishType] = useState('');
  const [price, setprice]: any = useState(0);
  const [code, setcode] = useState('');
  const hotel_id = sessionStorage.getItem('hotel_id');
  const [MeDisable, setMeDisable] = useState(true);
  const [mainmenudish, setmainmenudish] = useState([]);

  useEffect(() => {
    fetchSections();
    fetchDishes();
  }, [])

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
        setmainmenudish(data.output);
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

  const handleFetchDish = async () => {

    try {

      const response = await fetch(`${ApiHost}/api/hotel/menu/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'section_id': sessionStorage.getItem('menu_section_id')
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        // alert(data.message);
        setdishes(data.output);
      } else {
        alert("Failed to Add Dish");
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
        fetchDishes();
      } else {
        console.log("failed to fetch")
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  const handleAddMenu = () => {
    setShowaddmenu(!showaddmenu);
  }

  console.log(dishname, "\n", dishcode, "\n", dishtype)
  console.log("cate_id", sessionStorage.getItem('category_id_option'))

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
              <h2 className="text-lg mb-4">Add Menu</h2>
              <form onSubmit={handleAddMenuAll} className='w-full'>
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dish name"
                  >
                    Dish
                  </label>
                  <select className='rounded-lg'>
                    <option value="">---Select---</option>

                    {
                      mainmenudish.map((dish: any) => (
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
                    Section
                  </label>
                  <select className='rounded-lg'>
                    <option value="">---Select---</option>
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
            Menu <span className="text-red-500">Management</span>
          </h1>
        </div>
        <div className="w-full flex justify-between items-center px-4 py-2">
          <div className="w-full flex items-center gap-4">
            {
              section.map((categorys: any) => (
                <div
                  key={categorys.id}
                  onClick={
                    () => {
                      sessionStorage.setItem('menu_section_id', categorys.id);
                      handleFetchDish();
                      setMeDisable(false);
                    }
                  }
                  className="inline-flex justify-center items-center gap-4 bg-zinc-200 p-2 rounded-lg"
                >
                  <span>{categorys.SectionName}</span>
                </div>
              ))
            }
          </div>
        </div>
        <hr className="w-[99%] mx-auto border-[1.5px] border-red-500" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 m-10 sm:gap-4 ">
          {
            MeDisable
              ?
              (
                <div className='p-4 w-dvw font-bold text-2xl'>
                  <p>Click on the above Sections to get menu dishe&apos;s</p>
                </div>
              )
              :
              dishes.map((dish: any) => (

                <div
                  key={dish.id}
                  className={`relative overflow-hidden border rounded-lg bg-white shadow-lg p-4 flex flex-col items-center space-x-4 ${dish.Dish.Type === 'Veg' ? 'border-green-500' :
                    dish.Dish.Type === 'Non-Veg' ? 'border-red-500' :
                      dish.Dish.Type === 'Egg' ? 'border-yellow-500' :
                        'border-gray-500'
                    }`}
                >
                  <div
                    className="w-full"
                    onClick={
                      () => {
                        sessionStorage.setItem('dish_id', dish.id);
                        // handleDeleteDish();
                      }
                    }
                  >
                    <FaTrashCan size={20} />
                  </div>

                  <span className='absolute top-0 right-0 p-2 font-semibold bg-zinc-200 text-[12px] rounded-md'>{dish.Code}</span>
                  <h2 className="font-bold pt-4">{dish.Dish.DishName}</h2>
                  <p
                    className={`${dish.Dish.Type === 'Veg' ? 'text-green-500' :
                      dish.Dish.Type === 'Non-Veg' ? 'text-red-500' :
                        dish.Dish.Type === 'Egg' ? 'text-yellow-500' :
                          'text-gray-500'
                      }`}

                  > {dish.Dish.Type} </p>
                  <p>Rs.{dish.Price}</p>
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
