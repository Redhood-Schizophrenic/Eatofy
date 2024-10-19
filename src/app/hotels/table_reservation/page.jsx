"use client"
import HotelSideNav from '@/components/SideNavHotel';
import { ApiHost } from '@/constants/url_consts';
import React, { useEffect, useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

const ReservationGrid = () => {

  const getTodaysDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because getMonth() returns 0-based month
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getTodaysDate();

  const [data, setData] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [submitData, setsubmitData] = useState({
    date: today,
    time: '',
  });
  const [note, setnote] = useState('');
  const [contact, setcontact] = useState('');
  const [customer, setcustomer] = useState('');
  const [no_of_persons, setNo_of_persons] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [hotel_id, sethotel_id] = useState('');
  const searchBar = useRef();

  function handleClick(e) {
    const name = e.target.name;
    const value = e.target.value;
    setsubmitData({
      ...submitData,
      [name]: value
    })
  }

  const reset_values = () => {
    setcustomer('');
    setsubmitData({
      date: '',
      time: '',
    });
    setnote('');
    setcontact('');
    setNo_of_persons('');

  }

  const requestdata = {
    'hotelId': hotel_id
  }


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
        setData(data.output);
      } else {
        alert("Fetch Failed!!! :(")
      }

    } catch (e) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    sethotel_id(localStorage.getItem('hotel_id'));
    if (hotel_id) {
      handleFetchReservations();
      if (searchBar.current) {
        searchBar.current.focus();
      }
    }
  }, [hotel_id])

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      const response = await fetch(`${ApiHost}/api/hotel/reservations/management/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'no_of_persons': no_of_persons,
          'note': note,
          'date': submitData.date,
          'time': submitData.time,
          'customer_name': customer,
          'contact': contact,
          'hotel_id': requestdata.hotelId
        })
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setisOpen(false);
        reset_values();
      } else {
        alert("Failed to add reservation");
      }
      handleFetchReservations();
    } catch (e) {
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
        handleFetchReservations();
      }
    } catch (e) {

    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredReservation = data.filter((data_var) => {
    const reservationDate = new Date(data_var.Date);
    const todays_date = new Date(today);

    // Check if the reservationDate is today or in the future
    const isFutureOrToday = reservationDate >= todays_date;

    // Check if the CustomerName or Contact matches the search query
    const matchesQuery =
      data_var.Customer.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data_var.Customer.Contact.toLowerCase().includes(searchQuery.toLowerCase());

    // Combine both conditions
    return isFutureOrToday && matchesQuery;
  });

  return (
    <>
      <HotelSideNav />
      <div className="ml-[70px] flex flex-col p-4 text-black min-h-screen bg-white">
        <div className="flex flex-col items-center md:flex-row justify-between mb-8">
          <h2 className="text-3xl font-bold  text-center mb-2 md:mb-0">
            Hotel <span className="text-red-500">Reservation</span>
          </h2>

          <div>
            <input
              ref={searchBar}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search reservations..."
              className="px-4 py-2 border rounded-lg w-full mb-4"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <div className="border border-green-500 text-center p-4 rounded">
            <p className=" font-bold">Total Reservation</p>
            <p className="text-2xl">{filteredReservation.length}</p>
          </div>
          <div className='flex justify-end items-end'>
            <button
              onClick={() => {
                setisOpen(true);
              }}
              className="bg-red-500 text-white p-2 rounded">
              Add Reservation +
            </button>

          </div>
        </div>

        <h3 className="font-bold mb-2">Today's Reservations</h3>
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
                    <div>Note</div>
                  </th>
                  <th className='border p-2'>
                    <div>Time</div>
                  </th>
                  <th className='border p-2'>
                    <div>No of Persons</div>
                  </th>
                  <th className='border p-2'>
                    <div>Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredReservation.map((items) => (
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
                            <span>{items.Note}</span>
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
                          {
                            <span>{items.NoOfPersons}</span>
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
              <div className='absolute flex justify-between items-center z-0 top-0 left-0 w-full h-[60px] rounded-lg pl-8'>
                <h3 className='text-2xl font-bold text-red-500'> Add Reservation </h3>
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
                      <label htmlFor="customer">Customer Name<span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        placeholder="Customer name"
                        value={customer}
                        required
                        className="p-2 w-full text-sm focus:outline-none border border-zinc-500 focus:outline-red-500 rounded-lg"
                        onChange={(e) => {
                          setcustomer(e.target.value)
                        }}
                      />
                    </div>
                    <div className='p-2 w-full'>
                      <label htmlFor="customer">Date</label>
                      <input
                        type="date"
                        placeholder="YY-MM-DD"
                        name='date'
                        required
                        value={submitData.date}
                        className="p-2 w-full text-sm focus:outline-none border border-zinc-500  focus:outline-red-500 rounded-lg"
                        onChange={handleClick}
                      />
                    </div>
                    <div className='p-2 w-full'>
                      <label htmlFor="customer">Time</label>
                      <input
                        type="time"
                        placeholder="Time"
                        name='time'
                        required
                        value={submitData.time}
                        className="p-2 w-full text-sm focus:outline-none border border-zinc-500 focus:outline-red-500 rounded-lg"
                        onChange={handleClick}
                      />
                    </div>
                  </div>
                  <div className='w-1/2'>
                    <div className='p-2 w-full'>
                      <label htmlFor="customer">Customer Contact<span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        placeholder="Contact"
                        value={contact}
                        required
                        className="p-2 w-full text-sm focus:outline-none border border-zinc-500 focus:outline-red-500 rounded-lg"
                        onChange={(e) => {
                          setcontact(e.target.value)
                        }}
                      />
                    </div>
                    <div className='p-2 w-full'>
                      <label htmlFor="customer">Note</label>
                      <input
                        type="text"
                        placeholder="Note"
                        value={note}
                        className="p-2 w-full text-sm focus:outline-none border border-zinc-500 focus:outline-red-500 rounded-lg"
                        onChange={(e) => {
                          setnote(e.target.value);
                        }}
                      />
                    </div>
                    <div className='p-2 w-full'>
                      <label htmlFor="customer">No of Persons</label>
                      <input
                        type="text"
                        placeholder="No of Persons"
                        value={no_of_persons}
                        required
                        className="p-2 w-full text-sm focus:outline-none border border-zinc-500 focus:outline-red-500 rounded-lg"
                        onChange={(e) => {
                          setNo_of_persons(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className='w-full my-4 p-5 flex gap-4'>
                  <button type='submit' className="bg-red-500 text-white p-2 rounded-lg">Submit</button>
                  <button type='reset' onClick={() => { setisOpen(false); reset_values(); }} className="bg-gray-500 text-white p-2 rounded-lg">Close</button>
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
