'use client'

import { useEffect, useState } from "react";
import { FaArrowLeft, FaBriefcase, FaDashcube, FaHome, FaList, FaWarehouse } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBookBookmark, FaChartPie, FaTable } from "react-icons/fa6";
// import { MdOutline1K, MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import "../styles/navbar.css";
import Link from "next/link";
import { BiFoodMenu } from "react-icons/bi";

export default function HotelSideNav() {

  const path = usePathname();

  const [Owner, setOwner] = useState(false);
  const [Backoffice, setBackoffice] = useState(false);
  const [Waiter, setWaiter] = useState(false);

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isThere = sessionStorage.getItem('role');

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const changeRole = () => {
    switch (isThere) {
      case 'owner':
        setOwner(true);
        break;

      case 'backoffice':
        setBackoffice(true);
        break;

      case 'waiter':
        setWaiter(true);
        break;

      default:
        break;
    }
  }

  const changeColor = (name: any) => {

    switch (name) {
      case 'backoffice':
        if (isOpen1) {
          setIsOpen1(false);
        } else {
          setIsOpen1(true);
        }
        break;

      case 'menu_management':
        if (isOpen2) {
          setIsOpen2(false);
        } else {
          setIsOpen2(true);
        }
        break;

      case 'table_management':
        if (isOpen3) {
          setIsOpen3(false);
        } else {
          setIsOpen3(true);
        }
        break;

      case 'table_reservation':
        if (isOpen4) {
          setIsOpen4(false);
        } else {
          setIsOpen4(true);
        }
        break;

      case 'inventory_management':
        if (isOpen8) {
          setIsOpen8(false);
        } else {
          setIsOpen8(true);
        }
        break;

      case 'logout':
        if (isOpen5) {
          setIsOpen5(false);
        } else {
          setIsOpen5(true);
        }
        break;

      case 'dashboard':
        if (isOpen6) {
          setIsOpen6(false);
        } else {
          setIsOpen6(true);
        }
        break;

      case 'menu':
        if (isOpen7) {
          setIsOpen7(false);
        } else {
          setIsOpen7(true);
        }
        break;

      case 'home':
        if (isOpen9) {
          setIsOpen9(false);
        } else {
          setIsOpen9(true);
        }
        break;

      case 'reports':
        if (isOpen10) {
          setIsOpen10(false);
        } else {
          setIsOpen10(true);
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

  useEffect(() => {
    changeRole();
  }, [])

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
          <div className="w-full flex-1 flex flex-col justify-start items-center pt-4 px-2 gap-5 duration-300">
            {
              Owner
                ?
                (
                  <>
                    <Link
                      href="/hotels/home"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('home') }}
                      onMouseLeave={() => { changeColor('home') }}
                    >
                      <FaHome size={25} className="icon" color={isOpen9 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Home</span>
                    </Link>
                    <Link
                      href="/hotels/reports"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('reports') }}
                      onMouseLeave={() => { changeColor('reports') }}
                    >
                      <FaChartPie size={25} className="icon" color={isOpen10 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Reports</span>
                    </Link>
                    <Link
                      href="/hotels/dashboard"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('dashboard') }}
                      onMouseLeave={() => { changeColor('dashboard') }}
                    >
                      <FaDashcube size={25} className="icon" color={isOpen6 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Dashboard</span>
                    </Link>

                    <Link
                      href="/hotels/menu_management"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('menu_management') }}
                      onMouseLeave={() => { changeColor('menu_management') }}
                    >
                      <BiFoodMenu size={25} className="icon" color={isOpen2 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Menu</span>
                    </Link>

                    <Link
                      href="/hotels/backoffice"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('backoffice') }}
                      onMouseLeave={() => { changeColor('backoffice') }}
                    >
                      <FaBriefcase size={25} className="icon" color={isOpen1 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Back Office</span>
                    </Link>

                    <Link
                      href="/hotels/inventory_management"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('inventory_management') }}
                      onMouseLeave={() => { changeColor('inventory_management') }}
                    >
                      <FaWarehouse size={25} className="icon" color={isOpen8 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Inventory</span>
                    </Link>

                    <Link
                      href="/hotels/table_reservation"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('table_reservation') }}
                      onMouseLeave={() => { changeColor('table_reservation') }}
                    >
                      <FaBookBookmark size={25} className="icon" color={isOpen4 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Reservation</span>
                    </Link>
                  </>
                )
                :
                []
            }
            {
              Backoffice
                ?
                (
                  <>
                    <Link
                      href="/hotels/inventory_management"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('inventory_management') }}
                      onMouseLeave={() => { changeColor('inventory_management') }}
                    >
                      <FaWarehouse size={25} className="icon" color={isOpen8 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Inventory</span>
                    </Link>

                    <Link
                      href="/hotels/table_reservation"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('table_reservation') }}
                      onMouseLeave={() => { changeColor('table_reservation') }}
                    >
                      <FaBookBookmark size={25} className="icon" color={isOpen4 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Reservation</span>
                    </Link>

                    <Link
                      href="/hotels/backoffice"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('backoffice') }}
                      onMouseLeave={() => { changeColor('backoffice') }}
                    >
                      <FaBriefcase size={25} className="icon" color={isOpen1 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Back Office</span>
                    </Link>
                  </>
                )
                :
                []
            }
            {
              Waiter
                ?
                (
                  <>
                    <Link
                      href="/hotels/home"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('home') }}
                      onMouseLeave={() => { changeColor('home') }}
                    >
                      <FaHome size={25} className="icon" color={isOpen9 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Home</span>
                    </Link>

                    <Link
                      href="/hotels/table_reservation"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('table_reservation') }}
                      onMouseLeave={() => { changeColor('table_reservation') }}
                    >
                      <FaBookBookmark size={25} className="icon" color={isOpen4 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Reservation</span>
                    </Link>

                    {/*
                    <Link
                      href="/hotels/menu"
                      className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13px] p-2 py-3 gap-8 w-full"
                      onMouseEnter={() => { changeColor('menu') }}
                      onMouseLeave={() => { changeColor('menu') }}
                    >
                      <BiFoodMenu size={25} className="icon" color={isOpen7 ? '#fff' : ''} />
                      <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Menu</span>
                    </Link>
                    */}
                  </>
                )
                :
                []
            }
            <div className="flex-1"></div>
            <Link
              href="/hotels/auth"
              className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[14px] p-2 gap-8 w-full mb-4"
              onMouseEnter={() => { changeColor('logout') }}
              onMouseLeave={() => { changeColor('logout') }}
              onClick={() => { sessionStorage.clear() }}
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

// <Link
//   href="/eatofy/add/hotels"
//   className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13.5px] p-2 gap-8 w-full"
//   onMouseEnter={()=>{changeColor('addhotel')}}
//   onMouseLeave={()=>{changeColor('addhotel')}}
//   >
//   <FaHotel size={25} className="icon" color={isOpen3 ? '#fff' : ''} />
//   <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Add Hotels</span>
// </Link>
// <Link
// href="/eatofy/add/subscription"
// className="icons hover:bg-[#cc6666] hover:bg-opacity-50 inline-flex justify-start items-center pl-[13.5px] p-2 gap-8 w-full"
// onMouseEnter={()=>{changeColor('subscription')}}
// onMouseLeave={()=>{changeColor('subscription')}}
// >
// <MdOutlineSubscriptions size={25} className="icon" color={isOpen4 ? '#fff' : ''} />
//   <span className={`icons_name text-white text-xl ${isCollapsed ? 'block' : 'hidden'}`}>Subscription</span>
//             </Link>
