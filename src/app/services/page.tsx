'use client';

import { resolve4 } from "dns";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function Services() {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive1, setActive1] = useState<boolean>(false);
  const [isActive2, setActive2] = useState<boolean>(false);
  const [isActive3, setActive3] = useState<boolean>(false);
  const [isActive4, setActive4] = useState<boolean>(false);
  const [isActive5, setActive5] = useState<boolean>(false);
  const [isActive6, setActive6] = useState<boolean>(false);
  const [isActive7, setActive7] = useState<boolean>(false);

  const navigate = [
    { name: "Order Management" },
    { name: "Inventory Management" },
    { name: "Video Marketing" },
    { name: "Kitchen Order Ticket" },
    { name: "Staff Salary Management" },
    { name: "Marketing" },
    { name: "Other Relevent Features" },
  ]


  return (
    <>
      <div>
        <Head>
          <title>Eatofy</title>
          <meta name="description" content="Mastering Restaurant Management" />
        </Head>

        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <img src="/logo.png" width={200} height={200} alt="Illustration 2" />
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-red-600 focus:outline-none">
                {
                  isOpen
                    ?
                    <FaXmark size={25} />
                    :
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      ></path>
                    </svg>
                }
              </button>
            </div>
            <nav className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-800 hover:text-red-600">Home</a>
              <a href="#about" className="text-gray-800 hover:text-red-600">About Us</a>
              <a href="#services" className="text-gray-800 hover:text-red-600">Services</a>
              <a href="#contact us" className="text-gray-800 hover:text-red-600">Contact Us</a>
            </nav>
          </div>
          <div
            onClick={() => { }}
          >
            {
              isOpen
                ?
                <nav className="bg-zinc-100 shadow-lg">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">Home</a>
                    <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">About Us</a>
                    <a href="#services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">Services</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">Contact Us</a>
                  </div>
                </nav>
                :
                []
            }
          </div>
        </header>

        <section className="p-2 h-dvh">
          <div>
            <div className="w-[85%] mx-auto">
              <h1 className="text-center text-xl w-full mx-auto rounded-xl p-4">
                Services we offer
              </h1>
            </div>
            <div className="w-full mx-auto">
              <div className="h-full">
                <ul className="w-[300px] text-white">
                  {
                    navigate.map((items: any, index) => {

                      const id = index+1;

                      return (
                        <div
                          key={id}
                          className="inline-flex justify-between items-center"
                          onClick={
                            ()=>{
                              if (id === 1)
                                setActive1(true);
                              else if (id === 2)
                                setActive2(true);
                              else if (id === 3)
                                setActive3(true);
                              else if (id === 4)
                                setActive4(true);
                              else if (id === 5)
                                setActive5(true);
                              else if (id === 6)
                                setActive6(true);
                              else if (id === 7)
                                setActive7(true);
                              else 
                                alert("Failed");
                            }
                          }   
                        >
                          <li className="w-[300px] p-3 my-2 bg-red-500 rounded-xl">{items.name+' '+id}</li>
                          <hr 
                            className={
                              `
                              w-1/4 border-2
                              ${isActive1 ? 'border-gray-400' : 'border-red-500'}
                              ${isActive2 ? 'border-gray-400' : 'border-red-500'}
                              ${isActive3 ? 'border-gray-400' : 'border-red-500'}
                              ${isActive4 ? 'border-gray-400' : 'border-red-500'}
                              ${isActive5 ? 'border-gray-400' : 'border-red-500'}
                              ${isActive6 ? 'border-gray-400' : 'border-red-500'}
                              ${isActive7 ? 'border-gray-400' : 'border-red-500'}
                              
                              `
                            }
                          />
                        </div>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
