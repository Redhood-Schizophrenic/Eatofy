'use client'

import { ApiHost } from "@/constants/url_consts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EatofyLogin() {

	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [data, setdata] = useState([]);
	const route = useRouter();

	console.log(email);
	console.log(password);

	const FetchData = async (e:any) => {
		e.preventDefault();

		const	response = await fetch(`${ApiHost}/api/eatofy/auth/login`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ "email": email, "password": password }),
		})

		const data = await response.json();
		setdata(data);

		if (data.returncode === 200) {
			console.log("FUCK DOne")
			alert("Logged In")
			route.push('/eatofy/dashboard');
		}else{
			alert("Please enter valid Email and Password")
		}
	}

	console.log(data);

	return (
		<>
			<section className="flex flex-col justify-center bg-gradient-to-tr from-red-500 to-zinc-800 items-center w-full h-dvh gap-8 text-white">
				<div className="shadow-md shadow-slate-800 rounded-xl bg-black bg-opacity-20 ">
					<h1 className="text-2xl font-bold w-[450px] p-4">Login</h1>
					<form onSubmit={FetchData} className="flex flex-col justify-between items-center gap-12 w-[450px] h-auto p-6">
						<input
							type="email"
							placeholder="enter your email"
							value={email}
							onChange={(e:any) => {
								setemail(e.target.value);
							}}
							className="text-white bg-black bg-opacity-20 text-lg p-2 px-4 w-full rounded-md focus:outline-none focus:border-red-500 focus:border-2 focus:ring-0"
						/>
						<input
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e:any) => {
								setpassword(e.target.value);
							}}
							className="text-white bg-black bg-opacity-20 text-lg p-2 px-4 w-full rounded-md focus:outline-none focus:border-red-500 focus:border-2 focus:ring-0"
						/>

						<div className="w-full">
							<button className="bg-red-400 text-white font-bold w-full text-xl p-3 block hover:bg-red-500 rounded-md">Login</button>
							<div className="flex justify-between items-center p-2 mt-4">
								<button type="submit" className="text-red-400 text-center hover:text-red-500 font-bold w-full block rounded-md">Forget Password ?</button>
								<Link href="/eatofy/auth/register" className="font-bold cursor-pointer text-center w-full rounded-md">Register here</Link>
							</div>
						</div>
					</form>
				</div>
			</section>
		</>
	)
}
