"use client";

import Head from 'next/head';
import { useState } from 'react';
import ServiceCard from '@/components/ServiceCard';
import Footer from '@/components/Footer';
import { FaXmark } from 'react-icons/fa6';
import Link from 'next/link';
import { features } from '@/constants/features';
import { services } from '@/constants/services';

const Home = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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

      <div className='xl:m-[100px] sm:m-2 gap-2 flex-grow'>
        <div className="flex m-[100px]n flex-col md:flex-row items-center md:items-start justify-center md:justify-between mb-[100px] p-6 bg-gray-50">
          <div className="md:w-1/2 p-4 mt-6 text-center md:text-left">
            <h2 className="text-lg text-red-500 mt-4">Welcome to Eatofy</h2>
            <h1 className="text-4xl font-bold text-gray-800">Mastering Restaurant Management</h1>
            <p className="text-lg text-gray-500 mt-4">
              Are you ready to revolutionize the way you run your restaurant?
            </p>
            <p className="text-lg text-gray-500 mt-2">
              The ultimate restaurant management software designed to streamline and optimize your establishment&apos;s operations.
            </p>
            <button className='bg-red-500 rounded-[50px] p-3 mt-5'>Get Started</button>
          </div>
          <div className="md:w-1/2 p-4">
            <img src="/banner.png" alt="Restaurant Management" className="w-full h-auto" />
          </div>
        </div>

        <hr className="border-2 border-gray-300" />

        <div id="about" className="w-full h-auto lg:h-dvh p-4 my-4 flex justify-center items-center">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="md:w-1/2 p-4">
              <img src="/s2.png" alt="Restaurant Management" className="w-full h-auto" />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4 p-4">
              <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
              <div className="flex flex-col justify-center items-start gap-6 my-4 px-2">
                <p className="text-lg text-gray-500">
                  Welcome to Eatofy, your trusted partner in revolutionizing the hospitality industry with our cutting-edge POS software. Specializing in solutions tailored for hotels and restaurants, Eatofy is dedicated to enhancing operational efficiency and customer experiences. Our state-of-the-art software seamlessly integrates with your existing systems, offering intuitive interfaces and robust features designed to streamline order management, inventory control, and billing processes.
                </p>
                <p className="text-lg text-gray-500">
                  At Eatofy, we understand the unique challenges of the hospitality sector and are committed to providing innovative tools that empower your business to thrive. Join us in transforming the way you manage your establishment and deliver exceptional service to your guests.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center'>
          {
            features.map((items: any) => (
              <div key={items.emc[0].id} className="h-auto lg:h-dvh flex flex-col md:flex-row items-center justify-center md:justify-between p-6 bg-gray-50">
                <div className="md:w-1/2 p-4">
                  <img src={items.emc[0].image} alt={items.emc[0].title} className="w-full rounded-lg h-auto" />
                </div>
                <div className="md:w-1/2 h-auto p-4 flex flex-col justify-between items-center lg:items-end text-center md:text-right">
                  <h1 className="text-4xl font-bold text-gray-800">{items.emc[0].title}</h1>
                  <p className="text-lg text-gray-500 mt-4">{items.emc[0].description}</p>
                  <Link href={items.emc[0].link.url} className='w-full md:w-1/4 bg-red-500 rounded-[50px] text-center p-3 mt-5 m-5'>{items.emc[0].link.text}</Link>
                </div>
              </div>
            ))
          }

          {
            features.map((items: any) => (
              <div key={items.ot[0].id} className="h-auto lg:h-dvh flex flex-wrap-reverse md:flex-row items-center justify-center md:justify-between p-6 bg-gray-50">
                <div className="md:w-1/2 h-auto p-4 flex flex-col justify-between items-center lg:items-start text-center md:text-left">
                  <h1 className="text-4xl font-bold text-gray-800">{items.ot[0].title}</h1>
                  <p className="text-lg text-gray-500 mt-4">{items.ot[0].description}</p>
                  <Link href={items.ot[0].link.url} className='w-full md:w-1/4 bg-red-500 rounded-[50px] text-center p-3 mt-5 m-5'>{items.ot[0].link.text}</Link>
                </div>
                <div className="md:w-1/2 p-4">
                  <img src={items.ot[0].image} alt={items.ot[0].title} className="w-full rounded-lg h-auto" />
                </div>
              </div>
            ))
          }

          {
            features.map((items: any) => (
              <div key={items.sm[0].id} className="h-auto lg:h-dvh flex flex-col md:flex-row items-center justify-center md:justify-between p-6 bg-gray-50">
                <div className="md:w-1/2 p-4">
                  <img src={items.sm[0].image} alt={items.sm[0].title} className="w-full rounded-lg h-auto" />
                </div>
                <div className="md:w-1/2 h-auto p-4 flex flex-col justify-between items-center lg:items-end text-center md:text-right">
                  <h1 className="text-4xl font-bold text-gray-800">{items.sm[0].title}</h1>
                  <p className="text-lg text-gray-500 mt-4">{items.sm[0].description}</p>
                  <Link href={items.sm[0].link.url} className='w-full md:w-1/4 bg-red-500 rounded-[50px] text-center p-3 mt-5 m-5'>{items.sm[0].link.text}</Link>
                </div>
              </div>
            ))
          }
        </div>

        <div id="services" className="container mx-auto p-4">
          <h1 className="text-4xl font-bold text-black text-center mb-8">Our Services</h1>
          <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {
              services.map((items:any)=>(
                <div key={items.id} className="p-4">
                  <ServiceCard
                    title={items.title}
                    features={items.features}
                    imageSrc={items.imageSource}
                  />
                </div>
              ))
            }
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;

