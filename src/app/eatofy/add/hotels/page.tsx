'use client';

import React, { useEffect, useRef, useState } from "react";
import SideNav from "@/components/SideNavbar"
import { ApiHost } from "@/constants/url_consts";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { useRouter } from "next/navigation";
import Popup from "@/components/Popup";

export default function AddHotels() {

	const [data, setData]: any = useState([]);
	const [hotels, setHotels]: any = useState([]);
	const [showForm, setshowForm] = useState(false);
	const [istrue, setistrue] = useState(true);
	const [message, setMessage] = useState('')
	const form: any = useRef();
	const route = useRouter();

	//Variables to send backend to add hotels
	const [hotel_name, sethotel_name]: any = useState('');
	const [email, setemail]: any = useState('');
	const [password, setpassword]: any = useState('');
	const [website, setwebsite]: any = useState('N/A');
	const [address, setaddress] = useState('')
	const [fssai_code, setfssai_code]: any = useState('');
	const [contacts, setcontacts]: any = useState('');
	const [speciality, setspeciality]: any = useState('');
	const [file, setFile]: any = useState<File | undefined>();
	const specialArray = speciality.split(',');
	const contactsArray = contacts.split(',');

	//Variables to send backend to add owners
	const [ownername, setownername] = useState('');
	const [owneremail, setowneremail] = useState('');
	const [ownerpassword, setownerpassword] = useState('');

	// console.log(specialArray, ' ', contactsArray)

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		console.log(formData);
		formData.append('hotel_name', hotel_name);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('website', website);
		formData.append('address', address);
		formData.append('fssai_code', fssai_code);
		formData.append('speciality', specialArray);
		formData.append('contacts', contactsArray);
		formData.append('logo', file);

		console.log(formData);

		try {
			const response = await fetch(`${ApiHost}/api/eatofy/hotels/operations/add`, {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				const data = await response.json();
				console.log('Hotel created:', data);
				setistrue(!istrue);
				route.push('/eatofy/hotels');
				setMessage('Hotel Added');
			} else {
				console.error('Failed to create hotel');
				setMessage('Failed to Add hotel');
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};

	async function handleSubmitOwner(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {

			const response = await fetch(`${ApiHost}/api/eatofy/hotels/owners/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'hotel_id': sessionStorage.getItem('hotel_id'),
					'owner_name': ownername,
					'email': owneremail,
					'password': ownerpassword
				}),
			});

			const data = await response.json();

			if (data.returncode === 200) {
				console.log('Owners Added', data);
				setMessage('Owners Added');
			}

		} catch (e) {

		}
	}

	const deleteHotel = async (hotel_id: any) => {
		const res = await fetch(`${ApiHost}/api/eatofy/hotels/operations/remove`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'hotel_id': hotel_id
			})
		})
		const data = await res.json();
		setData(data);
	}

	const fetchHotels = async () => {
		const res = await fetch(`${ApiHost}/api/eatofy/hotels/operations/fetch`);
		const data = await res.json();
		setHotels(data.output);
	}
	console.log(hotels)

	const ShowForm = () => {
		form.current.classList.toggle('hidden');
	}

	useEffect(() => {
		fetchHotels();
		setTimeout(() => {
			setistrue(true);
		}, 3000);
	}, [])

	// console.log(website.length)

	return (
		<>
			<SideNav />
			<div className='ml-[70px] h-dvh bg-gradient-to-tr from-red-500 to-zinc-800 '>

				<div className=" px-4 py-4 w-full flex items-center justify-end">
					<button
						className="p-2 bg-red-400 hover:bg-red-500 text-white font-bold rounded-md"
						onClick={ShowForm}
					>
						Add Hotels
					</button>
				</div>

				<div className="p-8">
					<table className="table-auto w-full text-sm text-left rtl:text-right text-white shadow shadow-black">
						<thead className="text-left font-bold uppercase border-b-2 border-zinc-950">
							<tr className="text-center">
								<th className="px-4 py-4">Sr.No</th>
								<th className="px-4 py-4">Logo</th>
								<th className="px-4 py-4">Name</th>
								<th className="px-4 py-4">Address</th>
								<th className="px-4 py-4">Contacts</th>
								<th className="px-4 py-4">Speciality</th>
								<th className="px-4 py-4"></th>
							</tr>
						</thead>
						<tbody>
							{
								hotels.map((items: any, i: any) => (
									<tr
										key={i}
										className="px-4 py-4 border-black border text-center"
									>
										<td className="inline-flex justify-center items-center w-full">
											<div className="text-center">
												{++i}
											</div>
										</td>
										<td className="px-4 py-4 ">
											{
												<img
													key={items.id}
													src={`data:image/*;base64,${items.HotelLogo}`}
													alt={items.HotelName}
													className="w-[40px] h-[40px] rounded-full mx-auto"
												/>
											}
										</td>
										<td className="px-4 py-4">{items.HotelName}</td>
										<td className="px-4 py-4">{items.Address}</td>
										<td className="px-4 py-4">{items.Contacts}</td>
										<td className="px-4 py-4">{items.Speciality}</td>
										<td className="px-4 py-4 flex gap-6 justify-center items-center text-gray-400">
											<button
													onClick={
														() => {
															sessionStorage.setItem("hotel_name", items.HotelName);
															if (sessionStorage.getItem("hotel_name") === items.HotelName) {
																route.push('/eatofy/hotel');
																alert("Hotel selected")
															} else {
																alert("Hotel is not selected!!")
															}
														}
													}
											>
												<FaEye size={25} />
											</button>
											<button
												onClick={
													() => {
														sessionStorage.setItem("hotel_id", items.id);
														if (sessionStorage.getItem("hotel_id") === items.id) {
															route.push('/eatofy/subscription');
															alert("Hotel selected")
														} else {
															alert("Hotel is not selected!!")
														}
													}
												}
											>
												<MdOutlineSubscriptions size={25} />
											</button>
											<div className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
												onClick={
													() => {
														sessionStorage.setItem("hotel_id", items.id);
														showForm ? setshowForm(false) : setshowForm(true);
													}
												}
											>Add Owners</div>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>

				<div ref={form} id="form" className='hidden fixed top-0 left-0 w-full h-dvh flex flex-col md:flex-row backdrop-blur-md'>

					<div
						className="bg-black cursor-pointer w-[100px] text-center text-white p-2 px-3 fixed top-[10px] right-[10px] rounded-md mr-2"
						onClick={ShowForm}
					>close</div>

					<div className={`flex-1 bg-opacity-60 p-8 transition-margin duration-300 flex items-center justify-center`}>
						<div className="bg-red-900 bg-opacity-60 p-8 rounded-lg w-full max-w-3xl">
							<form encType="multipart/form-data" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
								<div>
									<label className="block text-white">Hotel Name</label>
									<input type="text" value={hotel_name} onChange={(e) => { sethotel_name(e.target.value) }} className="w-full p-2 bg-black bg-opacity-20 text-white rounded" />
								</div>
								<div>
									<label className="block text-white">Email</label>
									<input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} className="w-full p-2 bg-black bg-opacity-20 text-white rounded" />
								</div>
								<div>
									<label className="block text-white">Password</label>
									<input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} className="w-full p-2 bg-black bg-opacity-20 text-white rounded" />
								</div>
								<div>
									<label className="block text-white">Website</label>
									<input
										value={website}
										onChange={
											(e) => {
												if (e.target.value.length === 0) {
													setwebsite('N/A');
													console.log(e.target.value)
												} else {
													setwebsite(e.target.value);
												}
											}
										}
										type="text"
										className="w-full p-2 bg-black bg-opacity-20 text-white rounded"
									/>
								</div>
								<div>
									<label className="block text-white">Fssai code</label>
									<input
										value={fssai_code}
										onChange={(e) => { setfssai_code(e.target.value) }}
										type="text"
										className="w-full p-2 bg-black bg-opacity-20 text-white rounded"
									/>
								</div>
								<div>
									<label className="block text-white">Contact</label>
									<input type="text" className="w-full p-2 bg-black bg-opacity-20 text-white rounded"
										onChange={
											(e) => {
												setcontacts(e.target.value);
											}
										}
									/>
								</div>
								<div>
									<label className="block text-white">Address</label>
									<textarea
										onChange={
											(e) => {
												setaddress(e.target.value);
											}
										}
										className="w-full p-2 bg-black bg-opacity-20 text-white rounded"></textarea>
								</div>
								<div>
									<label className="block text-white">Speciality</label>
									<textarea className="w-full p-2 bg-black bg-opacity-20 text-white rounded"
										onChange={
											(e) => {
												setspeciality(e.target.value);
											}
										}
										defaultValue={speciality}
									></textarea>
								</div>
								<div>
									<label className="block text-white">Hotel Logo (Images)</label>
									<input type="file" className="w-full p-2 bg-black bg-opacity-20 text-white rounded"
										onChange={(e) => setFile(e.target.files?.[0])}
										defaultValue={file}
									/>
								</div>
								<div className="col-span-1 md:col-span-2 flex justify-between mt-4">
									<button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Add Hotel</button>
								</div>
							</form>

						</div>
					</div>
				</div>
			</div>
			{
				showForm ?
					<div className="fixed top-0 left-0 w-full h-dvh flex flex-col md:flex-row backdrop-blur-md" >
						<div className="bg-black text-white px-4 py-2 rounded fixed top-[10px] right-[10px]"
							onClick={
								() => {
									showForm ? setshowForm(false) : setshowForm(true);
								}
							}
						>close</div>
						<div className={`flex-1 bg-opacity-60 p-8 transition-margin duration-300 flex items-center justify-center`}>
							<div className="bg-red-900 bg-opacity-60 p-8 rounded-lg w-full max-w-3xl">
								<form encType="multipart/form-data" onSubmit={handleSubmitOwner} className="pt-4 flex flex-col gap-4">
									<div>
										<label className="block text-white">Owner name</label>
										<input
											value={ownername}
											onChange={
												(e) => {
													setownername(e.target.value);
												}
											}
											type="text"
											className="w-full p-2 bg-black bg-opacity-20 text-white rounded" />
									</div>
									<div>
										<label className="block text-white">Email</label>
										<input
											value={owneremail}
											onChange={
												(e) => {
													setowneremail(e.target.value);
												}
											}
											type="email"
											className="w-full p-2 bg-black bg-opacity-20 text-white rounded" />
									</div>
									<div>
										<label className="block text-white">Password</label>
										<input
											value={ownerpassword}
											onChange={
												(e) => {
													setownerpassword(e.target.value);
												}
											}
											type="password"
											className="w-full p-2 bg-black bg-opacity-20 text-white rounded" />
									</div>
									<div className="col-span-1 md:col-span-2 flex justify-between mt-4">
										<button type="submit" onClick={() => { route.push('/eatofy/hotels') }} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Add Hotel</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					:
					''
			}
		</>
	)
}

