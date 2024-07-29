'use client';

import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Eatofy = () => {

  const [isLoading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [tables, setTables] = useState([]);
  const route = useRouter();
  const hotel_id = sessionStorage.getItem('hotel_id');

  useEffect(() => {
    if (hotel_id) {
      fetchData();
    }
  }, [hotel_id]);

  const fetchData = async () => {
    setLoading(true);

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
        console.log("Failed to fetch sections");
      }

      if (tablesData.returncode === 200) {
        setTables(tablesData.output);
      } else {
        console.log("Failed to fetch tables");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <HotelSideNav />
      {isLoading ? (
        <div aria-label="Loading..." role="status" className="flex justify-center items-center w-full h-screen">
          <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
            <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          </svg>
          <span className="text-4xl font-medium text-gray-500">Loading...</span>
        </div>
      ) : (
        <div className="ml-[70px]">
          <div className="w-full p-4 h-full bg-white">
            <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Eatofy</h2>
            <div className="flex justify-between items-center my-8 p-4">
              <div></div>
              <div className='flex items-center gap-8'>
                <Link
                  href="/hotels/takeaway"
                  className="bg-red-600 text-white px-4 py-2 rounded-[30px]"
                  onClick={() => {
                    sessionStorage.setItem('order_type', "TakeAway");
                    sessionStorage.setItem('section_id', sections[0].id);
                  }}
                >
                  TakeAway
                </Link>
                <Link
                  href="/hotels/delivery"
                  className="bg-red-600 text-white px-4 py-2 rounded-[30px]"
                  onClick={() => {
                    sessionStorage.setItem('order_type', "Delivery");
                    sessionStorage.setItem('section_id', sections[0].id);
                  }}
                >
                  Delivery
                </Link>
                <Link
                  href="/hotels/swiggy"
                  className="inline-flex flex-row-reverse gap-2 items-center bg-gradient-to-r from-orange-400 to-orange-800 text-white px-4 py-2 rounded-[30px]"
                  onClick={() => {
                    sessionStorage.setItem('order_type', "Swiggy");
                    sessionStorage.setItem('section_id', sections[0].id);
                  }}
                >
                  <Image src={'/swiggy.svg'} width={15} height={15} alt="Help"/>  
                    Swiggy
                </Link>
                <Link
                  href="/hotels/zomato"
                  className="bg-gradient-to-r from-red-400 to-red-800 text-white px-4 py-2 rounded-[30px]"
                  onClick={() => {
                    sessionStorage.setItem('order_type', "Zomato");
                    sessionStorage.setItem('section_id', sections[0].id);
                  }}
                >
                  Zomato
                </Link>
              </div>
              <div className='flex flex-col gap-4'>
                <Link
                  href="/hotels/table_reservation"
                  className='px-4 py-2 bg-red-500 text-white rounded-2xl font-bold'
                >
                  Reservation +
                </Link>
              </div>
            </div>
            <div className='flex gap-4 justify-end items-center w-full px-4'>
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
                <span>Bill Printed</span>
              </div>
            </div>

            <div>
              {sections?.map((section) => (
                <div key={section.id} className="my-4">
                  <span className="bg-red-200 text-black px-4 py-2 rounded-lg">{section.SectionName}</span>
                  <div className="grid grid-cols-6 ml-5 gap-4 my-8">
                    {tables.filter((table) => table.SectionId === section.id)
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
                          className={`w-full h-40 inline-flex flex-col justify-center items-center p-4 rounded-lg border-2 ${table.Status === 'Booked' ? 'border-4 border-red-500' : 'border-black'}`}
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
      )}
    </>
  );
};

export default Eatofy;

