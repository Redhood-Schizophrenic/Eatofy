"use client";
import HotelSideNav from "@/components/SideNavHotel";
import { ApiHost } from "@/constants/url_consts";
import React, { useState, useEffect } from "react";

const StaffTable = () => {

  const hotel_id: any = sessionStorage.getItem('hotel_id');
  const [Staff, setStaff] = useState([]);
  const [staffId, setstaffId] = useState('');
  const [arrival_time, setarrival_time] = useState('');
  const [departure_time, setdeparture_time] = useState('');
  const [attendance_status, setattendance_status] = useState('');
  const [Message, setMessage] = useState('');
  const [isAttended, setisAttended] = useState(false);
  const [isFailed, setisFailed] = useState(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    fetchStaffForId();
  }, [])

  const fetchStaffForId = async () => {
    try {

      const response = await fetch(`${ApiHost}/api/hotel/staff/management/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'hotel_id': sessionStorage.getItem('hotel_id'),
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        console.log("staff", data);
        setStaff(data.output);
      }

    } catch (e: any) {
      throw console.error(e);
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
          'date': formattedDate,
          'arrival_time': arrival_time,
          'departure_time': departure_time,
          'type': attendance_status,
          'staff_id': sessionStorage.getItem('staff_id')
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {
        console.log(data);
        console.log("Attendance is Done");
        setMessage(data.message);
        setisAttended(true);
        setTimeout(() => {
          setisAttended(false);
        }, 2000);
        location.reload();
      }else{
        console.log("Attendance is failed");
        setMessage(data.message);
        setisFailed(true);
        setTimeout(() => {
          setisFailed(false);
        }, 2000);
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  console.log("staff id", Staff)
  console.log("arrival time", arrival_time)
  console.log("departure time", departure_time)
  console.log("type", attendance_status)
  console.log("date",formattedDate);

  return (
    <>
      <HotelSideNav />
      <div className={`ml-[70px] flex-1 h-screen p-4 bg-white`}>
        <h2 className="text-red-500 text-3xl mb-4">Staff</h2>

        <div className="flex space-x-4 mb-4">
          <button className="bg-zinc-800 text-white px-4 py-2 rounded">Staff Attendance</button>
        </div>

        {
          isAttended?(
            <div className="w-[600px] h-auto p-6 fixed top-10 right-10 border-t-[4px] border-green-500 bg-green-200 text-green-500">
              <h1>{Message}</h1>
            </div>
          ):[]
        }

        {
          isFailed?(
            <div className="w-[600px] h-auto p-6 fixed top-10 right-10 border-t-[4px] border-red-500 bg-red-200 text-red-500">
              <h1>{Message}</h1>
            </div>
          ):[]
        }

        <div className="flex h-[80dvh]">
          <div className="w-full h-full flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg z-10 w-[50%] relative">
              <h3 className="text-lg font-bold mb-4 text-red-500">Add New Staff Attendance</h3>
              <div>
                <div className="w-full flex flex-col gap-6">
                  <div>
                    <label htmlFor="member">Select staff</label>
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
                        Staff.map((member: any, index) => (
                          <option key={index} value={member.id} onClick={()=>{ sessionStorage.setItem('staff_id',member.id); }}>{member.FirstName}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div>
                    <label htmlFor="arrivaltime">Arrival time</label>
                    <input
                      type="time"
                      className="w-full rounded-lg"
                      value={arrival_time}
                      onChange={(e) => { setarrival_time(e.target.value); }}
                    />
                  </div>
                  <div>
                    <label htmlFor="departuretime">Departure time</label>
                    <input
                      type="time"
                      className="w-full rounded-lg"
                      value={departure_time}
                      onChange={(e) => { setdeparture_time(e.target.value); }}
                    />
                  </div>
                  <div>
                    <label htmlFor="type">Attendance status</label>
                    <select
                      name="type"
                      className="w-full rounded-lg"
                      value={attendance_status}
                      onChange={(e) => { setattendance_status(e.target.value); }}
                    >
                      <option value="">--Select--</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </div>
                  <div className="w-full inline-flex justify-between items-center my-4">
                    <button onClick={handleAddAttendance} className="p-2 bg-red-500 text-white rounded-lg" >Add attendance</button>
                    <button className="p-2 bg-black text-white rounded-lg" type="reset">cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffTable;
