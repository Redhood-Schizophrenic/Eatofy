'use client'

import { ApiHost } from "@/constants/url_consts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EatofyRegister() {

	const [username, setUsername] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [data, setdata] = useState([]);
	const route = useRouter();

	const FetchData = async (e) => {
		e.preventDefault();

		const response = await fetch(`${ApiHost}/api/eatofy/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ "username": username, "email": email, "password": password }),
		})

		const data = await response.json();
		setdata(data);

		if (data.returncode === 200) {
			alert("Registered Succesfully")
			route.push('/eatofy/dashboard');
		}else{
			alert("Fill All required fields")
		}
	}

	return (
		<>
			<section className="flex flex-col justify-center items-center w-full h-dvh gap-8 bg-gradient-to-tr from-red-500 to-zinc-800 text-white">
				<div className="shadow-md shadow-zinc-800 rounded-xl bg-black bg-opacity-20">
					<h1 className="text-2xl font-bold w-[450px] p-4">Login</h1>
					<form onSubmit={FetchData} className="flex flex-col justify-between items-center gap-12 w-[450px] h-auto p-6">
						<input
							type="text"
							placeholder="Enter your username"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							className="text-white bg-black bg-opacity-20 p-2 px-4 w-full rounded-md focus:outline-none focus:border-red-500 focus:border-2 focus:ring-0"
						/>
						<input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => {
								setemail(e.target.value);
							}}
							className="text-white bg-black bg-opacity-20 p-2 px-4 w-full rounded-md focus:outline-none focus:border-red-500 focus:border-2 focus:ring-0"
						/>
						<input
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => {
								setpassword(e.target.value);
							}}
							className="text-white bg-black bg-opacity-20 p-2 px-4 w-full rounded-md focus:outline-none focus:border-red-500 focus:border-2 focus:ring-0"
						/>



						<div className="w-full">
							<button className="bg-red-400 hover:bg-red-500 text-white font-bold w-full text-xl p-3 block shadow-md rounded-md">Login</button>
							<div className="flex justify-between items-center p-2 mt-4">
								<Link href="/eatofy" className="font-bold w-full block rounded-md text-red-400 text-center hover:text-red-500 underline">Alredy have account? Login here</Link>
							</div>
						</div>
					</form>
				</div>
			</section>
		</>
	)
}

