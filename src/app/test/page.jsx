'use client';

import { encode } from "punycode";
import { useState } from "react";

export default function Test() {

	const [data, setdata] = useState([]);
	const username = 'amar@sanmisha.com';
	const password = 'amar123@';

	const fetchResources = async () => {
		const response = await fetch('https://bbmoapp.bbnglobal.net/api/references', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Basic ${encode(`${username}:${password}`)}`,
			},
			redirect: 'follow'
		});

		const data = await response.json();

		if (data.response.status === 200) {
			setdata(data);
		} else {
		}
	}

	return (
		<>
			<button onClick={fetchResources}>Click</button>
			<p>{data.references}</p>
		</>
	)
}
