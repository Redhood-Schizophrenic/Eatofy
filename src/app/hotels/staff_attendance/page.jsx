"use client";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

const StaffTable = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [attendances, setAttendances] = useState([]);
  const [hotel_id, sethotel_id] = useState('');
  const [Staff, setStaff] = useState([]);
  const [staffId, setstaffId] = useState('');
  const [arrival_time, setarrival_time] = useState('9:00 A.M');
  const [departure_time, setdeparture_time] = useState('5:00 P.M.');
  const [attendance_status, setattendance_status] = useState('');
  const [Message, setMessage] = useState('');
  const [isAttended, setisAttended] = useState(false);
  const [isFailed, setisFailed] = useState(false);
  const today = new Date();
  const [dateFilter, setDateFilter] = useState(today.toISOString().split('T')[0]);

  const fetch_attendance = async () => {
    try {
      const response = await fetch(`${ApiHost}/api/hotel/staff/attendance/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': hotel_id,
          'date': dateFilter
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setAttendances(data.output);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const fetchStaffForId = async () => {
    try {
      const response = await fetch(`${ApiHost}/api/hotel/staff/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': hotel_id,
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        setStaff(data.output);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleAddAttendance = async () => {
    try {
      const response = await fetch(`${ApiHost}/api/hotel/staff/attendance/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'date': dateFilter,
          'arrival_time': arrival_time,
          'departure_time': departure_time,
          'type': attendance_status,
          'staff_id': sessionStorage.getItem('staff_id')
        }),
      });

      const data = await response.json();
      if (data.returncode === 200) {
        setDisplayForm(false)
        setMessage(data.message);
        setisAttended(true);
        setTimeout(() => {
          setisAttended(false);
        }, 2000);
        fetch_attendance(); // Refresh the data
      } else {
        setMessage(data.message);
        setisFailed(true);
        setTimeout(() => {
          setisFailed(false);
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    sethotel_id(sessionStorage.getItem('hotel_id'));
  }, []);

  useEffect(() => {
    if (hotel_id) {
      fetch_attendance();
      fetchStaffForId();
    }
  }, [hotel_id, dateFilter]); // Added dateFilter to dependency array

  return (
    <>
      <HotelSideNav />
      <div className={`ml-[70px] flex-1 h-screen p-4 bg-white`}>
        <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-2xl uppercase font-bold pb-6">Staff Attendance</h2>

        {
          isAttended ? (
            <div className="w-[600px] h-auto p-6 fixed top-10 right-10 border-t-[4px] border-green-500 bg-green-200 text-green-500">
              <h1>{Message}</h1>
            </div>
          ) : null
        }

        {
          isFailed ? (
            <div className="w-[600px] h-auto p-6 fixed top-10 right-10 border-t-[4px] border-red-500 bg-red-200 text-red-500">
              <h1>{Message}</h1>
            </div>
          ) : null
        }
        {
          displayForm &&
          <div className="absolute flex h-[80dvh] w-full">
            <div className="w-full h-full flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded shadow-lg z-10 w-[50%] relative">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold mb-4 text-red-500">Add Attendance</h3>
                  <div>
                    <button
                      onClick={() => {
                        setDisplayForm(false)
                      }}
                    >
                      <MdClose size={25} />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="w-full flex flex-col gap-6">
                    <div>
                      <label htmlFor="member">Staff</label>
                      <select
                        name="member"
                        className="w-full rounded-lg"
                        value={staffId}
                        onChange={
                          (e) => { setstaffId(e.target.value); }
                        }
                      >
                        <option value="">--Select--</option>
                        {
                          Staff.filter((staff) => staff?.Role?.toLowerCase() !== "owner")
                            .map((member, index) => (
                            <option key={index} value={member.id} onClick={() => { sessionStorage.setItem('staff_id', member.id); }}>{member.FirstName}</option>
                          ))
                        }
                      </select>
                    </div>
                    {/*
                    <div>
                      <label htmlFor="arrivaltime">Arrival time</label>
                      <input
                        type="time"
                        className="w-full rounded-lg"
                        value={arrival_time || ''}
                        onChange={(e) => { setarrival_time(e.target.value); }}
                      />
                    </div>
                    <div>
                      <label htmlFor="departuretime">Departure time</label>
                      <input
                        type="time"
                        className="w-full rounded-lg"
                        value={departure_time || ''}
                        onChange={(e) => { setdeparture_time(e.target.value); }}
                      />
                    </div>
                    */}
                    <div>
                      <label htmlFor="type">Attendance status</label>
                      <select
                        name="type"
                        className="w-full rounded-lg"
                        value={attendance_status || ''}
                        onChange={(e) => { setattendance_status(e.target.value); }}
                      >
                        <option value="">--Select--</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Half-Day">Half-Day</option>
                      </select>
                    </div>
                    <div className="w-full inline-flex justify-between items-center my-4">
                      <button onClick={handleAddAttendance} className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold">Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        <div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <input
                type="date"
                className="w-full rounded-lg"
                value={dateFilter || ''}
                onChange={(e) => {
                  e.preventDefault()
                  setDateFilter(e.target.value)
                }}
              />
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold"
                onClick={() => { fetch_attendance() }}
              >
                Search
              </button>
            </div>
            <button
              onClick={() => { setDisplayForm(true) }}
              className="bg-red-500 text-white px-4 py-2 rounded-md font-bold"
            >
              Add
            </button>
          </div>
          <div className="w-full pt-6">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="border px-4 py-2">#SR</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Staff Name</th>
                  <th className="border px-4 py-2">Address</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Designation</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendances
                  .filter((attendance) => attendance?.Staff?.Role?.toLowerCase() != "owner")
                  .map((attendance, index) => (
                  <tr className="bg-zinc-100 border-black" key={attendance.id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{attendance.Date}</td>
                    <td className="border px-4 py-2">{attendance.Staff.FirstName} {attendance.Staff.LastName}</td>
                    <td className="border px-4 py-2">{attendance.Staff.Address}</td>
                    <td className="border px-4 py-2">{attendance.Staff.DepartmentName}</td>
                    <td className="border px-4 py-2">{attendance.Staff.Designation}</td>
                    <td className={`border px-4 py-2 `}>
                      <label
                        htmlFor=""
                        className={`text-center px-2 py-1 rounded-lg font-semibold
                            ${(attendance.Type.toLowerCase() === "present") ? 'bg-green-200 text-green-500' :
                            (attendance.Type.toLowerCase() === "absent") ? 'bg-red-200 text-red-500' :
                              (attendance.Type.toLowerCase() === "Half-Day") ? 'bg-yellow-200 text-yellow-500' :
                                'text-gray-500 bg-gray-200'
                          }`}
                      >
                        {attendance.Type}
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffTable;
