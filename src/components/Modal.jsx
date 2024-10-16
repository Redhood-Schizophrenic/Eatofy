import Image from 'next/image';
import React from 'react'

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
    <div onClick={handleModal} className='w-full h-dvh fixed top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
      <div className='w-[80%] bg-white p-4 text-xl rounded-md'>
        <Image
          src={`data:image/*;base64,${HotelLogo}`}
          alt='hotel image'
          width={80}
          height={400}
          style={{ height: 80, borderRadius: '50%' }}
        />
        <div>{HotelName}</div>
        <div>{HotelEmail}</div>
        <div>{HotelAddress}</div>
        <div>{HotelContact}</div>
        <div>{HotelFssaiCode}</div>
        <div>{HotelSpeciality}</div>
        <div>{HotelWebsite}</div>
      </div>
    </div>
  )
}

