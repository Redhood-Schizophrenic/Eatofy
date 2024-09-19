'use client';

import Head from "next/head";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function EMC() {

  const [isOpen, setIsOpen] = useState(false);

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
              <a href="" className="text-gray-800 hover:text-red-600">Home</a>
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
            <h1 className="text-xl font-bold">/Features/Easy Menu Customization</h1>
          </header>
          <main className="w-[70%] mx-auto">
            <div
              style={{ backgroundImage: "url(/easy.png)", backgroundSize: "cover" }}
              className="w-full h-[400px] rounded-xl my-8 mx-2"
            ></div>
            <div className="flex justify-between items-start gap-8">
              <div className="flex-1">
                <section className="mb-8">
                  <p className="text-lg leading-relaxed">
                    Our Easy Menu Customization feature allows users to effortlessly modify and personalize their menu options. With a user-friendly interface, you can add, remove, or rearrange items with just a few clicks. This feature ensures that your menu reflects your personal preferences and dietary needs. Whether you&apos;re a foodie or have specific dietary restrictions, customizing your menu has never been easier.
                  </p>
                </section>
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">How It Works:</h2>
                  <p className="text-lg leading-relaxed">
                    Our system integrates seamlessly with your existing setup, allowing you to access the customization features through a simple dashboard. From there, you can easily drag and drop menu items, adjust their quantities, and apply your preferences to ensure that your menu meets all your needs. The intuitive design ensures that even users with minimal technical expertise can customize their menus efficiently.
                  </p>
                </section>
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Why Choose Us:</h2>
                  <p className="text-lg leading-relaxed">
                    Our Easy Menu Customization tool stands out due to its flexibility and ease of use. We prioritize user experience and provide robust support to ensure that you get the most out of our features. With our solution, you can enhance your menu&apos;s appeal, meet specific dietary requirements, and keep your customers satisfied with minimal effort.
                  </p>
                </section>
              </div>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>User-friendly interface</li>
                  <li>Add, remove, or rearrange items</li>
                  <li>Personalized menu options</li>
                  <li>Reflects dietary needs</li>
                  <li>Quick and easy customization</li>
                </ul>
              </section>
            </div>
            <footer className="text-center">
              <a href="http://example.com/easy-menu-customization" className="text-red-600 font-semibold hover:underline">
                Learn more about Easy Menu Customization
              </a>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
