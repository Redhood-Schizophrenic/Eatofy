'use client'

import { redirect, usePathname } from "next/navigation";

export default function Eatofy() {

	const path = usePathname();
	if (path === '/eatofy') {
		redirect('/eatofy/authentation');
	}else{
		return(
			<>
				<div className="flex justify-center items-center w-[calc(100% - 80px)]">
					<h1 className="text-2xl ">Please Login using Eatofy Admin account</h1>
				</div>
			</>
		)
	} 
}
