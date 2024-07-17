'use client';

import Head from "next/head";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function EMC() {

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
              <a href="/" className="text-gray-800 hover:text-red-600">Home</a>
              <a href="/#about" className="text-gray-800 hover:text-red-600">About Us</a>
              <a href="/#services" className="text-gray-800 hover:text-red-600">Services</a>
              <a href="/#contact us" className="text-gray-800 hover:text-red-600">Contact Us</a>
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

        <div className="bg-white text-black min-h-screen p-6">
          <header className="w-[80%] bg-red-500 text-white py-4 mb-6 mx-auto text-center rounded-xl">
            <h1 className="text-xl font-bold">/Features/Order Tracking</h1>
          </header>
          <main className="w-[70%] mx-auto">
            <div
              style={{ backgroundImage: "url(/tracking.png)", backgroundSize: "cover" }}
              className="w-full h-[400px] rounded-xl my-8 mx-2"
            ></div>
            <div className="flex justify-between items-start gap-8">
              <div className="flex-1">
                <section className="mb-8">
                  <p className="text-lg leading-relaxed">
                    Our Order Tracking service provides real-time updates on the status of your orders, ensuring a seamless and transparent shopping experience. With our intuitive tracking system, you can monitor your order from the moment it&apos;s placed until it reaches your doorstep.
                  </p>
                </section>
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">How It Works:</h2>
                  <p className="text-lg leading-relaxed">
                    Once you place an order, you will receive a tracking number that you can use to monitor its progress. Our system provides live updates on each stage of the shipping process, from dispatch to delivery. You can easily check the status of your order at any time through our user-friendly dashboard.
                  </p>
                </section>
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Benefits of Using Our Service:</h2>
                  <p className="text-lg leading-relaxed">
                    By using our Order Tracking service, you gain peace of mind knowing exactly where your order is and when it will arrive. This transparency helps you plan better and avoid any unnecessary surprises. Our efficient system ensures that you are always in the loop, enhancing your overall shopping experience.
                  </p>
                </section>
              </div>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Real-time order updates</li>
                  <li>Detailed shipping progress</li>
                  <li>Estimated delivery times</li>
                  <li>Delay notifications</li>
                  <li>Purchase monitoring</li>
                </ul>
              </section>
            </div>
            <footer className="text-center">
              <a href="http://example.com/order-tracking" className="text-red-600 font-semibold hover:underline">
                Learn more about Order Tracking
              </a>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
