'use client'

import { useEffect, useRef, useState } from "react";
import { GoHome } from "react-icons/go";
import { FaArrowLeft, FaChartPie, FaHotel } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
import "../styles/navbar.css";
import Link from "next/link";

export default function SideNav() {

	const path = usePathname();

	const [isOpen1, setIsOpen1] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(false);
	const [isOpen4, setIsOpen4] = useState(false);
	const [isOpen5, setIsOpen5] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleNavbar = () => {
		setIsCollapsed(!isCollapsed);
	};

	const changeColor = (name: any) => {

		switch (name) {
			case 'home':
				if (isOpen1) {
					setIsOpen1(false);
				} else {
					setIsOpen1(true);
				}
				break;

			case 'dashboard':
				if (isOpen2) {
					setIsOpen2(false);
				} else {
					setIsOpen2(true);
				}
				break;

			case 'addhotel':
				if (isOpen3) {
					setIsOpen3(false);
				} else {
					setIsOpen3(true);
				}
				break;
			
			case 'subscription':
				if (isOpen4) {
					setIsOpen4(false);
				} else {
					setIsOpen4(true);
				}
				break;

			case 'logout':
				if (isOpen5) {
					setIsOpen5(false);
				} else {
					setIsOpen5(true);
				}
				break;

			default:
				alert("Navbar is Breaked @@ :O :O");
				break;
		}

	}

	return (
		<>
			<nav className={`navbar fixed z-10 top-0 left-0 bg-slate-950 ${isCollapsed ? 'expanded' : 'collapsed'} duration-700`}>
				<div className="flex flex-col h-full">
					<div className="inline-flex justify-start items-center gap-7 p-2 mt-2 relative">
						<div className="w-[60px] h-[45px] inline-flex flex-col items-center justify-center gap-1 rounded-md p-0ml-1" onClick={toggleNavbar}>
							<img src="/eatofyicon.svg" alt="Icon" className="w-[25px]" />
						</div>
						<h1 className={`lg:text-2xl text-xl text-red-500 font-bold text-center pt-[5px] ${isCollapsed ? 'block' : 'hidden'}`}>Eatofy</h1>

						<div className={`bg-slate-950 inline-flex justify-center items-center w-[60px] h-[60px] rounded-full absolute top-[2px] ${isCollapsed ? '' : 'left-[-100px]'} duration-300`} onClick={toggleNavbar}>
							<FaArrowLeft size={22} className="text-red-500" />
						</div>
					</div>
					<div className="w-full flex-1 flex flex-col justify-start items-center pt-6 px-2 gap-7">
						<Link
							href="/"
							className={`icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center ${isCollapsed ? 'pl-[12px]' : 'pl-[11.5px]'} p-2 gap-8 w-full`}
							onMouseEnter={()=>{changeColor('home')}}
							onMouseLeave={()=>{changeColor('home')}}
						>
							<GoHome size={30} className="icon" color={isOpen1 ? '#fff' : ''} />
							<span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Home</span>
						</Link>
						<Link
							href="/eatofy/dashboard"
							className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 gap-8 w-full"
							onMouseEnter={()=>{changeColor('dashboard')}}
							onMouseLeave={()=>{changeColor('dashboard')}}
						>
							<FaChartPie size={25} className="icon" color={isOpen2 ? '#fff' : ''} />
							<span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Dashboard</span>
						</Link>
						<Link
							href="/eatofy/add/hotels"
							className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13.5px] p-2 gap-8 w-full"
							onMouseEnter={()=>{changeColor('addhotel')}}
							onMouseLeave={()=>{changeColor('addhotel')}}
						>
							<FaHotel size={25} className="icon" color={isOpen3 ? '#fff' : ''} />
							<span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Add Hotels</span>
						</Link>
						<Link
							href="/eatofy/add/subscription"
							className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13.5px] p-2 gap-8 w-full"
							onMouseEnter={()=>{changeColor('subscription')}}
							onMouseLeave={()=>{changeColor('subscription')}}
						>
							<MdOutlineSubscriptions size={25} className="icon" color={isOpen4 ? '#fff' : ''} />
							<span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Subscription</span>
						</Link>
						<div className="flex-1"></div>
						<Link
							href="/eatofy"
							className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[14px] p-2 gap-8 w-full mb-4"
							onMouseEnter={()=>{changeColor('logout')}}
							onMouseLeave={()=>{changeColor('logout')}}
						>
							<IoLogOutOutline size={25} className="icon" color={isOpen5 ? '#fff' : ''} />
							<span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Logout</span>
						</Link>
					</div>
				</div>
			</nav>

		</>
	);
}

