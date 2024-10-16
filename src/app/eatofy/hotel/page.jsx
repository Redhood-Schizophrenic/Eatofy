'use client'

import SideNav from "@/components/SideNavbar"
import { ApiHost } from "@/constants/url_consts";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react"

export default function Hotels() {

	const [data, setData] = useState([]);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [showForm, setshowForm] = useState(false);
	const form = useRef();
	const route = useRouter();

	//Variables to send backend to add hotels
	const [hotel_name, sethotel_name] = useState('');
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');
	const [website, setwebsite] = useState('N/A');
	const [address, setaddress] = useState('')
	const [fssai_code, setfssai_code] = useState('');
	const [contacts, setcontacts] = useState('');
	const [speciality, setspeciality] = useState('');
	const [file, setFile] = useState();
	const specialArray = speciality.split(',');
	const contactsArray = contacts.split(',');

	// const handleSubmitProfle = async (e) => {
	// 	e.preventDefault();
	//
	// 	const formData = new FormData(e.currentTarget);
	// 	formData.append('logo', file);
	//
	// 	try {
	// 		const response = await fetch(`${ApiHost}/api/eatofy/hotels/management/fetch`, {
	// 			method: 'PUT',
	// 			body: formData,
	// 		});
	//
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			setMessage('Profile updated');
	// 		} else {
	// 			console.error('Profile Update Failed');
	// 			setMessage('Profile update failed');
	// 		}
	// 	} catch (error) {
	// 		console.error('An error occurred:', error);
	// 	}
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		formData.append('hotel_name', hotel_name);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('website', website);
		formData.append('address', address);
		formData.append('fssai_code', fssai_code);
		formData.append('speciality', specialArray);
		formData.append('contacts', contactsArray);

		try {
			const response = await fetch(`${ApiHost}/api/eatofy/hotels/operations/update/details`, {
				method: 'PUT',
				body: formData,
			});

			if (response.ok) {
				await response.json();
				route.push('/eatofy/add/hotels')
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};

	const ShowForm = () => {
		form.current.classList.toggle('hidden');
	}

	const fetchHotel = async () => {
		const res = await fetch(`${ApiHost}/api/eatofy/hotels/management/fetch`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'hotel_name': sessionStorage.getItem('hotel_name'),
			}),
		});
		const data = await res.json();
		setData(data.output);
	}

	useEffect(() => {
		fetchHotel();
	}, [])

	return (
		<>
			<SideNav />
			<div className="ml-[70px] h-dvh bg-gradient-to-tr from-red-500 to-zinc-800 flex justify-center items-center ">
				{
					data.map((items) => (
						<div key={items.id} className="w-[80%] h-[80%] bg-black bg-opacity-20 rounded-lg shadow-md shadow-zinc-900 text-white p-4 flex flex-row justify-center items-center">
							<div className="w-[30%] h-full flex flex-col justify-center items-center">
								<img src={`data:image/*;base64,${items.HotelLogo}`} alt="hotel_img" className="w-[200px] rounded-full p-1 m-2" />
								<div className="text-2xl">{items.HotelName}</div>
								<div>{items.Email}</div>
								<button
									className="bg-black text-white p-2 rounded-lg my-2"
									onClick={
										() => {
											showForm ? setshowForm(false) : setshowForm(true);
										}
									}
								>update pic</button>
							</div>
							<div className="flex-1 h-[80%] flex flex-col gap-4 justify-center items-center">
								<div className="w-[90%] flex justify-evenly items-center">
									<div className="p-4 w-[50%] text-2xl inline-flex flex-col justify-center items-center gap-4">
										<div className="font-bold text-left">
											Fssai code
										</div>
										<div>{items.FSSAICode}</div>
									</div>
									<div className="p-4 w-[50%] text-2xl inline-flex flex-col items-center gap-4">
										<div className="font-bold text-left">
											Address
										</div>
										<div>{items.Address}</div>
									</div>
								</div>
								<div className="w-[90%] flex justify-evenly items-center">
									<div className="p-4 w-[50%] text-2xl inline-flex flex-col items-center gap-4">
										<div className="font-bold text-left">
											hotel Speciality
										</div>
										<div>{
											items.Speciality.map((item, i) => (
												<div key={i} className="">

													<span>{++i}:- </span>
													<span>{item}</span><br />
												</div>
											))
										}</div>
									</div>
									<div className="p-4 w-[50%] text-2xl inline-flex flex-col items-center gap-4">
										<div className="font-bold text-left">
											hotel contacts
										</div>
										<div>{
											items.Contacts.map((item, i) => (
												<div key={i} className="">
													<span>{++i}:- </span>
													<span>{item}</span><br />
												</div>
											))
										}</div>
									</div>
								</div>
								<div className="w-full text-center mt-4">
									<button onClick={ShowForm} className="bg-black text-white p-2 rounded-lg">Update hotel</button>
								</div>
							</div>
						</div>
					))
				}
			</div>

			<div ref={form} id="form" className='hidden fixed top-0 left-0 w-full h-dvh flex flex-col md:flex-row backdrop-blur-xl bg-black bg-opacity-70'>

				<div className={`flex-1 bg-opacity-100 shadow-md shadow-zinc-900 p-8 transition-margin duration-300 flex items-center justify-center`}>
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
								<input type="text" value={contacts} className="w-full p-2 bg-black bg-opacity-20 text-white rounded"
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
									value={address}
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
									value={speciality}
									onChange={
										(e) => {
											setspeciality(e.target.value);
										}
									}
									defaultValue={speciality}
								></textarea>
							</div>
							<div className="col-span-1 md:col-span-2 flex justify-between mt-4">
								<button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Update Hotel</button>
								<div
									className="bg-black cursor-pointer w-[100px] text-center text-white p-2 px-3 rounded-md "
									onClick={ShowForm}
								>close</div>
							</div>
						</form>

					</div>
				</div>
			</div>

			{
				showForm ?
					<div className="fixed top-0 left-0 w-full h-dvh flex flex-col md:flex-row backdrop-blur-xl bg-black bg-opacity-60" >
						<div className={`flex-1 bg-opacity-60 p-8 transition-margin duration-300 flex items-center justify-center`}>
							<div className="bg-red-900 bg-opacity-60 p-8 rounded-lg w-full max-w-3xl">
								<form encType="multipart/form-data" className="pt-4 flex flex-col gap-4">
									<div>
										<label className="block text-white">Owner name</label>
										<input
											type="file"
											className="w-full p-2 bg-black bg-opacity-20 text-white rounded" />
									</div>
									<div className="col-span-1 md:col-span-2 flex justify-between mt-4">
										<button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Add Hotel</button>
										<div className="bg-black text-white px-4 py-2 rounded-md"
											onClick={
												() => {
													showForm ? setshowForm(false) : setshowForm(true);
												}
											}
										>close</div>
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
