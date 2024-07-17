"use client"

import React, { useEffect, useRef, useState } from 'react';
import "chart.js/auto";
import { Line } from 'react-chartjs-2';
import { CiSearch } from "react-icons/ci";
import SideNav from '@/components/SideNavbar';
import { ApiHost } from '@/constants/url_consts';

const Dashboard = () => {

  const [isValid, setisValid] = useState('');
  const [isSearched, setisSearched] = useState(true);
  const [data, setdata]: any = useState([]);
  const [totalhotel, setTotalhotel]: any = useState(0);
  const [totalhotelsubs, setTotalHotelSubs]: any = useState(0);
  const [totalsubs, setTotalSubs]: any = useState(0);
  const select: any = useRef();
  const [totalhotelsearch, setTotalhotelsearch]: any = useState(0);
  const [totalhotelsubsearch, setTotalHotelSubsearch]: any = useState(0);
  const [totalsubsearch, setTotalSubsearch]: any = useState(0);
  const [show, setshow] = useState(false);

  const fetchData = async () => {
    const res = await fetch(`${ApiHost}/api/eatofy/dashboard`);
    const data = await res.json();
    setdata(data.output[0].subscribed_hotels);
    console.log(data);
    setTotalhotel(data.output[0].total_hotels);
    setTotalHotelSubs(data.output[0].total_subscribed_hotels);
    setTotalSubs(totalsubplus(data.output[0].subscribed_hotels));
  }

  function totalsubplus(data: any) {

    let total = 0;

    data.forEach((price: any) => {
      total += price.Subscription.Price;
    });

    return total;
  }


  const filterDataByDate = (data: any, filterType: any, customAmount: any) => {
    const today = new Date();

    if (filterType === '2days') {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 1);
      return data.filter((item: any) => new Date(item.StartDate) >= startDate);
    }

    if (filterType === '1week') {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
      return data.filter((item: any) => new Date(item.StartDate) >= startDate);
    }

    if (filterType === '1month') {
      const startDate = new Date(today);
      startDate.setMonth(today.getMonth() - 30);
      return data.filter((item: any) => new Date(item.StartDate) >= startDate);
    }

    if (filterType === '6months') {
      const startDate = new Date(today);
      startDate.setMonth(today.getMonth() - 182);
      return data.filter((item: any) => new Date(item.StartDate) >= startDate);
    }

    if (filterType === customAmount) {
      const startDate = new Date(today);
      startDate.setMonth(today.getMonth() - customAmount);
      return data.filter((item: any) => new Date(item.StartDate) >= startDate);
    }

    return data;
  };


  function SearchMoney() {
    console.log("I'm executed")
    if (isSearched) {
      const output = filterDataByDate(data, isValid, 7);
      setshow(true);
      console.log(show, output.length)
      setTotalhotelsearch(output.length);
      setTotalHotelSubsearch(output.length);
      setTotalSubsearch(totalsubplus(output));
    }
  }


  useEffect(() => {

    fetchData();

  }, [])

  console.log(data)
  console.log(totalhotelsubsearch)
  // console.log("Hello",filterDataByDate(data,'2days',18));

  const data1 = data.map((item: any)=> item.Subscription.Price);

  const dataLine = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'Revenues',
        data: data1,
        borderColor: '#FFA500',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FFA500',
        pointHoverBackgroundColor: '#FFA500',
        pointBorderColor: '#FFF',
        pointHoverBorderColor: '#FFF',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  return (
    <div
      className="flex bg-gradient-to-tr from-red-500 to-zinc-800 h-full"
    >
      <SideNav />
      <div className="flex-1 backdrop-blur-sm ml-[60px] p-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-white text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="w-[350px] inline-flex items-center backdrop-blur-xl bg-black/30 rounded-lg shadow-md">
              <select
                className="w-[300px] p-4 text-white rounded-lg bg-transparent"
                onChange={
                  (e) => {
                    setisValid(e.target.value);
                  }
                }
              >
                <option value="false" defaultChecked>Search...</option>
                <option value="2days">2 days</option>
                <option value="1week">1 week</option>
                <option value="1month">1 month</option>
                <option value="6month">6 month</option>
                <option value="custom">Custom</option>
              </select>
              <div
                className="w-[40px] h-[40px] inline-flex items-center justify-center"
                onClick={SearchMoney}
              >
                <CiSearch className="text-white" size={30} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
        >
          <div
            className="backdrop-blur-xl bg-black/30 p-4 rounded-lg shadow-md border-t-4 border-red-500 hover:scale-105 duration-150"
          >
            <h2 className="text-white">Total Hotel</h2>
            <p className="text-2xl text-white font-bold py-2">{show ? totalhotelsearch : totalhotel}</p>
            {/*<p className="text-green-500">+2.5%</p>*/}

          </div>
          <div
            className="backdrop-blur-xl bg-black/30 p-4 rounded-lg shadow-md border-t-4 border-red-500 hover:scale-105 duration-150"
          >
            <h2 className="text-white">Total Subscriptions</h2>
            <p className="text-2xl text-white font-bold py-2">{show ? totalhotelsubsearch : totalhotelsubs}</p>
            {/*<p className="text-red-500">-3.5%</p>*/}
          </div>
          <div
            className="backdrop-blur-xl bg-black/30 p-4 rounded-lg shadow-md border-t-4 border-red-500 hover:scale-105 duration-150"
          >
            <h2 className="text-white">Total Revenue</h2>
            <p className="text-2xl text-white font-bold py-2">₹ {show ? totalsubsearch : totalsubs}</p>
            {/*<p className="text-green-500">+5.5%</p>*/}
          </div>
        </div>
        <div className="bg-black/60 p-4 rounded-lg shadow-md">
          <h2 className="text-white mb-2">Sales over time</h2>
          <Line data={dataLine} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
//   <div
// className="grid mt-7 grid-cols-1 md:grid-cols-2 gap-4 mb-4"
// >
//   <div
//     className="backdrop-blur-xl bg-black/30 p-4 rounded-lg shadow-md border-t-4 border-red-500"
//   >
//     <h2 className="text-white"></h2>
//     <p className="text-2xl text-white font-bold">1 Active Subscriptions</p>
//   </div>
//     </div>
