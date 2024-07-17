'use client'

import SideNav from "@/components/SideNavbar";
import { ApiHost } from "@/constants/url_consts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HotelSubscription() {

	const [data, setdata] = useState([]);
	const [valid, setvalid] = useState(false);
	const [isvalid, setisvalid]:any = useState('');
	const [start_date, setstart_date] = useState('');
	const [start_time, setstart_time] = useState('');
	const [end_date, setend_date] = useState('');
	const [end_time, setend_time] = useState('');
	const route:any = useRouter();
	let settime: any;
	const valnum = parseInt(sessionStorage.getItem("subscription_validity") || '0');

	async function handleSubmit(e: any) {
		e.preventDefault();

		if (isvalid === 'true') {
			setvalid(true);
		} else if (isvalid === 'false') {
			setvalid(false);
		}

		const hotel_id = sessionStorage.getItem('hotel_id');
		const subscription_id = sessionStorage.getItem('subscription_id');

		try {
			const response = await fetch(`${ApiHost}/api/eatofy/hotel_subscription/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'hotel_id': hotel_id,
					'subscription_id': subscription_id,
					'is_valid': valid,
					'start_date': start_date,
					'start_time': start_time,
					'end_date': end_date,
					'end_time': end_time
				})
			});

			if (response.ok) {
				const data = await response.json();
				setdata(data);
				console.log('Subscription Added:', data);
				alert("Subscription Added");
				route.push('/eatofy/add/hotels');
			} else {
				console.error('Failed to Add Subscription');
				alert("Failed to Add Subscription")
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}

	}

	function incrementDate(dateStr: any, validityDays: any) {
		let date = new Date(dateStr);
		date.setDate(date.getDate() + validityDays);
		let day = date.getDate().toString().padStart(2, '0');
		let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
		let year = date.getFullYear();
		return `${year}-${month}-${day}`;
	}

	useEffect(() => {

		if (start_date) {
			setend_date(incrementDate(start_date, valnum));
			const date = new Date();
			let minuts:any = date.getMinutes();
			minuts = minuts.toString().padStart(2,'0');
			setend_time(`${date.getHours()}:${minuts}`);
			console.log(end_time,"hello")
		}

	}, [start_date, valnum, end_time])

	function convertTo24Hour(timeStr: any) {
		let [time, modifier] = timeStr.split(' ');
		let [hours, minutes] = time.split(':');
		hours = parseInt(hours);
		if (modifier === 'PM' && hours !== 12) {
			hours += 12;
		}
		if (modifier === 'AM' && hours === 12) {
			hours = 0;
		}

		return `${hours.toString().padStart(2, '0')}:${minutes}`;
	}

	console.log(`${start_date}T${start_time}`);
	console.log(isvalid)
	
	function SelectMy(){
		isvalid ? setisvalid(false) : setisvalid(true);
	}

	return (
		<>
			<SideNav />
			<section className="ml-[60px] bg-gradient-to-tr from-red-500 to-zinc-800 flex justify-center items-center h-dvh">
				<form encType="multipart/form-data" onSubmit={handleSubmit} className="w-[80%] h-[80%] rounded-lg bg-black bg-opacity-20 flex flex-col justify-center items-center gap-6 text-white">
					<div className="w-[60%]">
						<label>Valid or Not</label>
						<select
							id="validation"
							name="validation"
							className="bg-black bg-opacity-20 rounded w-full py-2 px-3 leading-tight"
							value={isvalid}
							onChange={SelectMy}
						>
							<option value="true" defaultValue={isvalid}>Valid</option>
							<option value="false">Not Valid</option>
						</select>
					</div>
					<div className="w-[60%]">
						<label>Start date</label>
						<input
							type="date"
							id="start_date"
							className="bg-black bg-opacity-20 rounded w-full py-2 px-3 leading-tight"
							required
							placeholder="start date"
							defaultValue={start_date}
							onChange={
								(e) => {
									setstart_date(e.target.value);
								}
							}
						/>
					</div>
					<div className="w-[60%]">
						<label>Start time</label>
						<input
							type="time"
							id="start_time"
							className="bg-black bg-opacity-20 rounded w-full py-2 px-3 leading-tight"
							required
							placeholder="start time"
							defaultValue={start_time}
							onChange={
								(e) => {
									settime = convertTo24Hour(e.target.value);
									setstart_time(settime);
								}
							}
						/>
					</div>
					<div className="flex justify-between items-center w-[60%] px-3 py-6 ">
						<button type="submit" className="bg-red-500 text-white font-bold p-3 rounded-md border border-red-500">
							Add subscription
						</button>
						<button type="button" onClick={ ()=>{ route.push('/eatofy/add/hotels') } } className="w-[100px] bg-black text-white font-bold p-3 rounded-md">
							Back
						</button>
					</div>
				</form>
			</section>
		</>
	)
}
