'use client';

import HotelSideNav from '@/components/SideNavHotel'
import { ApiHost } from '@/constants/url_consts';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import React, { useEffect, useState } from 'react'
import { IoCalendarOutline, IoWarningOutline } from 'react-icons/io5';
import { MdOutlineInventory2 } from 'react-icons/md';

export default function Notification() {

  const [parent, enableAnimations] = useAutoAnimate();
  const [openGroups, setOpenGroups] = useState({}); // State to keep track of open/close status for each title
  const [Notification_data, setNotification_data] = useState([]);

  const notificationIcons = {
    Inventory: <MdOutlineInventory2 />,
    Reservation: <IoCalendarOutline />,
    Subscription: <IoWarningOutline />,
  };

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
  };

  // Group notifications by title and type (same title, different descriptions and icon by Type)
  const groupNotificationsByTitle = (notifications) => {
    return notifications.reduce((acc, notification) => {
      const { Title, Description, Type } = notification;

      if (!acc[Title]) {
        acc[Title] = { Title, Type, descriptions: [] };  // Group by Title and include Type
      }

      acc[Title].descriptions.push(Description);

      return acc;
    }, {});
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const groupedNotifications = groupNotificationsByTitle(Notification_data);

  // Toggle open/close for a specific title group
  const toggleGroupOpen = (title) => {
    setOpenGroups((prevOpenGroups) => ({
      ...prevOpenGroups,
      [title]: !prevOpenGroups[title], // Toggle the state for the clicked title
    }));
  };

  return (
    <>
      <HotelSideNav />
      <div ref={parent} className='ml-[70px]'>
        <div className='p-4 flex justify-start items-center'>
          <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Notifications</h2>
        </div>
        <div className='px-4' id="Notification">
          {
            Object.keys(groupedNotifications).map((title) => {
              const { descriptions, Type } = groupedNotifications[title];
              const isOpen = openGroups[title]; // Check if this group is open
              const Icon = notificationIcons[Type] || <MdOutlineInventory2 />; // Use the correct icon based on Type

              return (
                <div
                  key={title}
                  className='h-auto shadow-gray-400 bg-gray-300 shadow-md p-2 py-4 my-4 rounded-md'
                  onClick={() => toggleGroupOpen(title)}
                >
                  {/* Display the title once */}
                  <div className='flex justify-between h-full items-center' >
                    <div className='flex gap-4 px-4 items-center'>
                      <div className='text-2xl'>
                        {Icon} {/* Dynamically render the icon */}
                      </div>
                      <h1 className='text-lg font-bold text-red-500'>{title}</h1>
                    </div>
                    <div className="text-gray-500 cursor-pointer pr-4">
                      {isOpen ? '▲' : '▼'} {/* Up/Down arrow to indicate toggle */}
                    </div>
                  </div>

                  {/* Display all descriptions under the title only if open */}
                  {isOpen && (
                    <div className='p-4'>
                      {descriptions.map((description, index) => (
                        <p key={index} className='mt-2'>{description}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}
