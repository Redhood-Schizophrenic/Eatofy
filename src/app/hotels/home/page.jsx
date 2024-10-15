'use client';

import Notification from '@/components/Notification';
import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";

const Eatofy = () => {

  const [sections, setSections] = useState([]);
  const [tables, setTables] = useState([]);
  const route = useRouter();
  const searchBar = useRef();
  const [hotel_id, sethotel_id] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {

    try {
      const sectionsResponse = await fetch(`${ApiHost}/api/hotel/sections/management/fetch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'hotel_id': hotel_id }),
      });

      const tablesResponse = await fetch(`${ApiHost}/api/hotel/tables/management/fetch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'hotel_id': hotel_id }),
      });

      const sectionsData = await sectionsResponse.json();
      const tablesData = await tablesResponse.json();

      if (sectionsData.returncode === 200) {
        setSections(sectionsData.output);
      } else {
        alert("Failed to fetch sections");
      }

      if (tablesData.returncode === 200) {
        setTables(tablesData.output);
      } else {
        alert("Failed to fetch tables");
      }
    } catch (e) {
      console.error(e);
    }
  }

  console.log(hotel_id)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    sethotel_id(localStorage.getItem('hotel_id'));
    if (hotel_id) {
      fetchData();
      if (searchBar.current) {
        searchBar.current.focus();
      }
    }
  }, [hotel_id]);

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px]">
        <div className="w-full p-4 h-full">
          <div className='flex justify-between items-center'>
            <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Eatofy</h2>

            <div className='w-[40%] py-2 pl-4 flex border rounded-3xl border-black justify-between items-center'>
              <input
                ref={searchBar}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search table..."
                className="border-none w-full focus:ring-0"
              />
              <div className='bg-red-500 p-3 rounded-full mr-[0.50rem]'>
                <FaMagnifyingGlass color='#fff' />
              </div>
            </div>

            <div className='flex gap-4 items-center'>
              <Link
                href="/hotels/table_reservation"
                className='px-4 py-2 bg-red-500 text-white rounded-2xl font-bold'
              >
                Reservation +
              </Link>
              <Notification />
            </div>


          </div>
          <div className="flex justify-between items-center my-8 p-4">
            <div className='flex items-start gap-8'>
              <Link
                href="/hotels/takeaway"
                className="inline-flex flex-row-reverse gap-2 items-center bg-red-600 text-white px-4 py-2 rounded-[30px]"
                onClick={() => {
                  sessionStorage.setItem('type', "Takeaway");
                  sessionStorage.setItem('section_id', sections[0].id);
                }}
              >
                <Image src={'/takeaway.svg'} width={15} height={15} alt="Help" />
                TakeAway
              </Link>
              <Link
                href="/hotels/delivery"
                className="inline-flex flex-row-reverse gap-2 items-center bg-red-600 text-white px-4 py-2 rounded-[30px]"
                onClick={() => {
                  sessionStorage.setItem('type', "Delivery");
                  sessionStorage.setItem('section_id', sections[0].id);
                }}
              >
                <Image src={'/delivery.svg'} width={15} height={15} alt="Help" />
                Delivery
              </Link>
              <Link
                href="/hotels/swiggy"
                className="inline-flex flex-row-reverse gap-2 items-center bg-gradient-to-r from-orange-400 to-orange-800 text-white px-4 py-2 rounded-[30px]"
                onClick={() => {
                  sessionStorage.setItem('type', "Swiggy");
                  sessionStorage.setItem('section_id', sections[0].id);
                }}
              >
                <Image src={'/swiggy.svg'} width={15} height={15} alt="Help" />
                Swiggy
              </Link>
              <Link
                href="/hotels/zomato"
                className="inline-flex flex-row-reverse gap-2 items-center bg-gradient-to-r from-red-400 to-red-800 text-white px-4 py-2 rounded-[30px]"
                onClick={() => {
                  sessionStorage.setItem('type', "Zomato");
                  sessionStorage.setItem('section_id', sections[0].id);
                }}
              >
                <Image src={'/zomato.svg'} width={15} height={15} alt="Help" />
                Zomato
              </Link>
            </div>
            <div className='flex gap-2 justify-end items-center px-4'>
              <div className='flex gap-2 justify-center items-center'>
                <span className="bg-black w-3 h-3 block border border-black rounded-2xl"></span>
                <span>Available</span>
              </div>
              <div className='flex gap-2 justify-center items-center'>
                <span className="bg-red-500 w-3 h-3 block border border-black rounded-2xl"></span>
                <span>Booked</span>
              </div>
              <div className='flex gap-2 justify-center items-center'>
                <span className="bg-green-500 w-3 h-3 block border border-black rounded-2xl"></span>
                <span>Bill Pending</span>
              </div>
            </div>
          </div>

          <div>
            {sections.map((section) => (
              <div key={section.id} className="my-4">
                <span className="bg-red-200 text-black px-4 py-2 rounded-lg">{section.SectionName}</span>
                <div className="grid grid-cols-6 ml-5 gap-4 my-8">
                  {tables.filter((table) => table.TableName.toLowerCase().includes(searchQuery.toLowerCase()) && table.SectionId === section.id)
                    .map((table) => (
                      <div
                        key={table.id}
                        onClick={() => {
                          sessionStorage.setItem('table_id', table.id);
                          sessionStorage.setItem('table_name', table.TableName)
                          sessionStorage.setItem('section_id', section.id);
                          sessionStorage.setItem('type', "Dine-In")
                          route.push('/hotels/menu');
                        }}
                        className={`w-full h-40 inline-flex flex-col justify-center items-center p-4 rounded-lg border-2 ${table.Status === 'Booked' ? 'border-4 border-red-500' : (
                          table.Status === "Bill Pending" ? 'border-4 border-green-500' : 'border-4 border-black'
                        )}`}
                      >
                        <div className="font-bold">{table.TableName}</div>
                        <span className='block'>{table.PersonsOccupiable} Persons</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Eatofy;
