"use client"
import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

const ReservationGrid: React.FC = () => {

  const [data, setData] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [submitData, setsubmitData] = useState({
    date: '',
    time: '',
  });
  const [note, setnote] = useState('');
  const [contact, setcontact] = useState('');
  const [customer, setcustomer] = useState('');

  function handleClick(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    setsubmitData({
      ...submitData,
      [name]: value
    })
  }

  const requestdata = {
    'hotelId': sessionStorage.getItem('hotel_id')
  }

  const date = new Date();

  const getTodaysDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because getMonth() returns 0-based month
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getTodaysDate();

  console.log("Date -> ", today);

  async function handleFetchReservations() {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/reservations/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'date': today,
          'hotel_id': requestdata.hotelId
        }),
      })

      const data = await response.json();

      if (data.returncode === 200) {
        console.log("data -> ", data);
        setData(data.output);
        console.log("output -> ", data.output);
      } else {
        alert("Fetch Failed!!! :(")
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  useEffect(() => {

    handleFetchReservations();

  }, [])

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {

      const response = await fetch(`${ApiHost}/api/hotel/reservations/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'note': note,
          'date': submitData.date,
          'time': submitData.time,
          'customer_name': customer,
          'contact': contact,
          'hotel_id': requestdata.hotelId
        })
      });

      const data = await response.json();
      console.log(date);

      if (data.returncode === 200) {
        alert("Table Reserved Succesfully");
        setisOpen(false);
      } else {
        alert("Failed to add reservation");
      }
      handleFetchReservations();
      // location.reload();
    } catch (e: any) {
      throw console.error(e);

    }
  }

  const handleDelete = async () => {
    try {

      const res_id = sessionStorage.getItem('reservation_id');

      const response = await fetch(`${ApiHost}/api/hotel/reservations/management/update/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'reservation_id': res_id,
          'status': 'Inactive'
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        console.log("deleted",data);
        handleFetchReservations();
      }else{
        console.log("Failed to delete");
      }

    } catch (e: any) {

    }
  }

  console.log(submitData.date, " ", submitData.time)

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] flex flex-col p-4 text-black min-h-screen bg-white">
        <div className="flex flex-col items-center md:flex-row justify-between mb-8">
          <h2 className="text-xl font-bold  text-center mb-2 md:mb-0">
            Table <span className="text-red-500">Reservation</span>
          </h2>
          <button
            onClick={() => {
              setisOpen(true);
            }}
            className="bg-red-500 text-white p-2 rounded">
            Add Table Reservation +
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <div className="border border-green-500 text-center p-4 rounded">
            <p className="font-bold">Total Reservation</p>
            <p className="text-2xl">{data.length}</p>
          </div>
        </div>

        <h3 className="font-bold mb-2">Reservation Grid</h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-lg table-auto">
              <thead>
                <tr className="bg-red-500 text-white text-left">
                  <th className='border p-2'>
                    <div>Date</div>
                  </th>
                  <th className='border p-2'>
                    <div>Customer name</div>
                  </th>
                  <th className='border p-2'>
                    <div>Contact no</div>
                  </th>
                  <th className='border p-2'>
                    <div>Status</div>
                  </th>
                  <th className='border p-2'>
                    <div>Time</div>
                  </th>
                  <th className='border p-2'>
                    <div></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((items: any) => (
                    <tr key={items.id}>
                      <td className="p-2">
                        <div className="flex flex-col sm:flex-row items-center">
                          {
                            <span>{items.Date}</span>
                          }
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-col sm:flex-row items-center">
                          {
                            <span>{items.Customer.CustomerName}</span>
                          }
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-col sm:flex-row items-center">
                          {
                            <span>{items.Customer.Contact}</span>
                          }
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-col sm:flex-row items-center">
                          {
                            <span>{items.Status}</span>
                          }
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-col sm:flex-row items-center">
                          {
                            <span>{items.Time}</span>
                          }
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-col sm:flex-row items-center">
                          <FaTrash size={28} onClick={() => { sessionStorage.setItem('reservation_id', items.id); handleDelete() }} />
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {
        isOpen
          ?
          <div className="fixed top-0 left-0 w-full h-dvh bg-black bg-opacity-55 flex justify-center items-center backdrop-blur-sm">
            <div className='w-[800px] h-[600px] bg-white p-4 relative rounded-lg'>
              <div className='absolute flex justify-end items-center z-0 top-0 left-0 w-full h-[60px] bg-red-500 rounded-lg'>
                <div
                  onClick={() => { setisOpen(false) }}
                  className='w-[30px] h-[30px] mx-4 inline-flex justify-center items-center rounded-full border-2 border-black'>
                  <FaXmark size={25} />
                </div>
              </div>
              <form className="h-full flex justify-center items-center flex-col" onSubmit={handleSubmit}>
                <div className="w-full flex justify-evenly items-start rounded-lg p-4">
                  <div className='w-1/2'>
                    <div className='p-2 w-full'>
                      <input
                        type="text"
                        placeholder="Customer name"
                        value={customer}
                        required
                        className="p-2 w-full text-xl focus:outline-none border border-zinc-200 focus:outline-red-500 rounded-lg"
                        onChange={(e) => {
                          setcustomer(e.target.value)
                        }}
                      />
                    </div>
                    <div className='p-2 w-full'>
                      <input
                        type="text"
                        placeholder="YY-MM-DD"
                        name='date'
                        required
                        value={submitData.date}
                        className="p-2 w-full text-xl focus:outline-none border border-zinc-200  focus:outline-red-500 rounded-lg"
                        onChange={handleClick}
                      />
                    </div>
                    <div className='p-2 w-full'>
                      <input
                        type="text"
                        placeholder="Time"
                        name='time'
                        required
                        value={submitData.time}
                        className="p-2 w-full text-xl focus:outline-none border border-zinc-200 focus:outline-red-500 rounded-lg"
                        onChange={handleClick}
                      />
                    </div>
                  </div>
                  <div className='w-1/2'>
                    <div className='p-2 w-full'>
                      <input
                        type="text"
                        placeholder="contact"
                        value={contact}
                        required
                        className="p-2 w-full text-xl focus:outline-none border border-zinc-200 focus:outline-red-500 rounded-lg"
                        onChange={(e) => {
                          setcontact(e.target.value)
                        }}
                      />
                    </div>
                    <div className='p-2 w-full'>
                      <input
                        type="text"
                        placeholder="note"
                        value={note}
                        required
                        className="p-2 w-full text-xl focus:outline-none border border-zinc-200 focus:outline-red-500 rounded-lg"
                        onChange={(e) => {
                          setnote(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className='w-full my-4 p-5'>
                  <button type='submit' className="bg-red-500 text-white text-xl p-2 rounded-lg">Submit</button>
                </div>
              </form>
            </div>
          </div>
          :
          <div className='hidden'></div>
      }
    </>
  );
};

export default ReservationGrid;


