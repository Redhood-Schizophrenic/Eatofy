'use client';

import { useState } from "react"

export default function ResturantForm() {

	const [username, setusername] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

	console.log(username);
	console.log(email);
	console.log(password);

	return(
		<>
			<h1 className="text-2xl font-bold">Create account here</h1>
			<form className="flex flex-col justify-between items-center gap-4 w-[450px] p-4">
				<input 
					type="text"
					placeholder="Enter your user name"
					value={username}
					onChange={(e)=>{
						setusername(e.target.value);
					}}
					className="text-black bg-white text-xl p-2 w-full rounded-md"
				/>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e)=>{
						setemail(e.target.value);
					}}
					className="text-black bg-white text-xl p-2 w-full rounded-md"
				/>
				<input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e)=>{
						setpassword(e.target.value);
					}}
					className="text-black bg-white text-xl p-2 w-full rounded-md"
				/>

				<button className="bg-red-400 text-white w-full text-xl p-2 block rounded-md">Create account</button>
			</form>
		</>
	)
}
