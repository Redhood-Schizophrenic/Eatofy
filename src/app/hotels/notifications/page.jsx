'use client';

import HotelSideNav from '@/components/SideNavHotel'
import { ApiHost } from '@/constants/url_consts';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import React, { useEffect, useState } from 'react'
import { FaBell, FaCheckDouble } from 'react-icons/fa'
import { MdOutlineInventory2 } from 'react-icons/md';

export default function Notification() {

  const [parent, enableAnimations] = useAutoAnimate()
  const [isOpen, setisOpen] = useState(null);
  const [Notification_data, setNotification_data] = useState([]);

  const fetchNotifications = async () => {
    const hotel_id = localStorage.getItem("hotel_id");
    console.log("Fetching notifications for hotel_id:", hotel_id); // Check if function is called

    try {
      const response = await fetch(`${ApiHost}/api/hotel/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hotel_id
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        setNotification_data(data.output);
      }
    } catch (error) {
      console.error('Error fetching notifications', error);
    }
  }


  useEffect(() => {
    fetchNotifications();
  }, [])

  return (
    <>
      <HotelSideNav />
      <div ref={parent} className='ml-[70px]'>
        <div className='p-4 flex justify-start items-center'>
          <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Notifications</h2>
        </div>
        <div className='px-4'>
          {Notification_data.map((notification, index) => (
            <div key={index} ref={parent}
              className=' h-auto shadow-gray-400 bg-gray-300 shadow-md p-2 py-4 my-4 rounded-md'
            >
              <div
                className='flex justify-between h-full items-center'
              >
                <div className='flex gap-4 px-4 items-center' onClick={() => { setisOpen(isOpen === notification?.id ? null : notification?.id) }}>
                  <div className='text-2xl'>
                    <MdOutlineInventory2 />
                  </div>
                  <h1 className='text-lg font-bold text-red-500'>{notification?.Title}</h1>
                </div>
                {/*<div className='px-4'>{notes.isMarked ? <FaBell size={25} color='#ef4444' /> : <FaCheckDouble size={25} color='#ef4444' />}</div>*/}
              </div>
              {
                isOpen === notification?.id && (
                  <div className='p-4 '>
                    <p>{notification?.Description}</p>
                  </div>
                )
              }
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
