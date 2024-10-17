import Image from 'next/image';
import React from 'react'
import { FaXmark } from 'react-icons/fa6';

export default function Modal({
  isOpen,
  handleModal,
  HotelName,
  HotelEmail,
  HotelFssaiCode,
  HotelAddress,
  HotelContact,
  HotelSpeciality,
  HotelWebsite,
  HotelLogo
}) {

  if (!isOpen) {
    return null;
  }
  return (
    <div className='w-full h-dvh fixed top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center z-10'>
      <div className='w-[80%] relative bg-white p-8 text-lg rounded-md z-[80]'>

        <FaXmark size={50} color='#000' className='p-2 px-4 absolute top-5 right-5 active:bg-gray-300 rounded-full' onClick={handleModal} />

        <div className='mt-8 flex justify-between items-center p-4'>
          <div className='p-8 pr-10'>
            <Image
              src={`data:image/*;base64,${HotelLogo}`}
              alt='hotel image'
              width={200}
              height={400}
              style={{ height: 200, borderRadius: '50%' }}
            />
            <div className='text-xl font-bold my-4 text-center'>{HotelName}</div>
            <button className='w-full bg-red-500 active:bg-red-600 py-2 rounded-md text-white font-semibold'>Update</button>
          </div>
          <div className='flex-1 w-full flex flex-col items-start gap-4 p-5'>
            <div className='w-full'>
              <div>Email</div>
              <div className='w-full p-2 px-4 shadow-sm shadow-gray-500 rounded-md'>{HotelEmail}</div>
            </div>
            <div className='w-full'>
              <div>Address</div>
              <div className='w-full p-2 px-4 shadow-sm shadow-gray-500 rounded-md'>{HotelAddress}</div>
            </div>
            <div className='w-full'>
              <div>Contacts</div>
              <div className='w-full p-2 px-4 shadow-sm shadow-gray-500 rounded-md'>{HotelContact}</div>
            </div>
            <div className='w-full'>
              <div>Fssai Code</div>
              <div className='w-full p-2 px-4 shadow-sm shadow-gray-500 rounded-md'>{HotelFssaiCode}</div>
            </div>
            <div className='w-full'>
              <div>Speciality</div>
              <div className='w-full p-2 px-4 shadow-sm shadow-gray-500 rounded-md'>{HotelSpeciality}</div>
            </div>
            <div className='w-full'>
              <div>Website</div>
              <div className='w-full p-2 px-4 shadow-sm shadow-gray-500 rounded-md'>{HotelWebsite === 'N/A' ? 'Not Added' : HotelWebsite}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

