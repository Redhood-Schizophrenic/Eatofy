import { ApiHost } from '@/constants/url_consts';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaBell } from 'react-icons/fa'



export default function Notification() {

  const router = useRouter();
  const [popupnum, setpopupnum] = useState([]);

  const fetchNotifications = async () => {
    const hotel_id = localStorage.getItem("hotel_id");

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
        setpopupnum(data.output);
      }

    } catch (error) {
      console.error('Error fetching notifications', error);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, [])


  function handleNotification() {
    router.push('/hotels/notifications');
  }

  return (
    <div onClick={handleNotification} className='active:bg-gray-100 p-3 rounded-full relative'>
      <FaBell size={35} color='#000' />
      <span className='absolute top-[5px] right-[5px] w-[10px] h-[15px] flex justify-center items-center bg-red-500 text-white text-[10px] text-bold px-2 py-1 rounded-full'>{popupnum.length}</span>
    </div>
  )
}
