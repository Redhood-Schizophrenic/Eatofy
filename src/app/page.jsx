"use client";

import { useState } from 'react';
import Footer from '@/components/Footer';
import { FaXmark } from 'react-icons/fa6';
import Link from 'next/link';
import { features } from '@/constants/features';
import { services } from '@/constants/services';
import { FaUsers } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {

  const [isOpen, setIsOpen] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div id='Mainpagebody'>
      <div className="min-h-screen flex flex-col items-center">

        <header id='header' className="bg-white shadow relative w-full">
          <div id='navbar' className="container bg-white mx-auto px-4 py-6 flex justify-between items-center sticky top-10 z-50">
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
          <nav className={`w-full bg-zinc-100 shadow-lg absolute duration-500 ${isOpen ? 'top-[80px]' : 'top-[-200px]'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">Home</a>
              <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">About Us</a>
              <a href="#services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">Services</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600">Contact Us</a>
            </div>
          </nav>
        </header>

        <div id='Mainpage' className={`sm:m-2 gap-2 flex-grow duration-500 ${isOpen ? 'mt-[250px]' : 'mt-[0px] md:mt-0'}`}>

          <div className='bg-white my-4'>
            <div className="w-full lg:w-[80dvw] mx-auto flex h-auto lg:h-[80dvh] flex-col-reverse md:flex-row items-center md:items-start justify-center md:justify-between p-8">
              <div className="w-full md:w-1/2 h-full px-10 mt-6 text-center md:text-left flex flex-col justify-center">
                <h2 className="text-lg text-red-500 mt-4">Welcome to Eatofy</h2>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-800">Mastering Restaurant Management</h1>
                <p className="text-lg text-gray-500 mt-4">
                  Are you ready to revolutionize the way you run your restaurant?
                </p>
                <p className="text-lg text-gray-500 mt-2">
                  The ultimate restaurant management software designed to streamline and optimize your establishment&apos;s operations.
                </p>
                <button>
                  <a href='/hotels/auth' className='bg-red-500 text-white rounded-[50px] p-3 mt-5 w-full lg:w-1/4'>
                    Get Started
                  </a>
                </button>
              </div>
              <div className="md:w-1/2 w-full p-4">
                <img src="/banner.png" alt="Restaurant Management" className='p-4' />
              </div>
            </div>
          </div>

          <div id="about" className="h-auto lg:h-[80dvh] p-4 my-4 flex justify-center items-center w-auto lg:w-[80dvw] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center px-10">
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

          <div className='flex flex-col justify-center items-center text-white w-auto lg:w-[80dvw] mx-auto px-10'>
            {
              features.map((items) => (
                <div key={items.emc[0].id} className="h-auto lg:h-dvh flex flex-col lg:flex-row items-center justify-center md:justify-between p-6">
                  <div className="lg:w-1/2 p-4">
                    <img src={items.emc[0].image} alt={items.emc[0].title} className="w-full rounded-lg h-auto" />
                  </div>
                  <div className="lg:w-1/2 h-auto p-4 flex flex-col justify-between items-center lg:items-end text-center md:text-right">
                    <h1 className="text-4xl font-bold text-gray-800">{items.emc[0].title}</h1>
                    <p className="text-lg text-gray-500 mt-4">{items.emc[0].description}</p>
                    <Link href={items.emc[0].link.url} className='w-full lg:w-1/4 bg-red-500 rounded-[50px] text-center p-3 mt-5 m-5'>{items.emc[0].link.text}</Link>
                  </div>
                </div>
              ))
            }

            {
              features.map((items) => (
                <div key={items.ot[0].id} className="h-auto lg:h-dvh flex flex-wrap-reverse lg:flex-row items-center justify-center md:justify-between p-6">
                  <div className="lg:w-1/2 h-auto p-4 flex flex-col justify-between items-center lg:items-start text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-800">{items.ot[0].title}</h1>
                    <p className="text-lg text-gray-500 mt-4">{items.ot[0].description}</p>
                    <Link href={items.ot[0].link.url} className='w-full lg:w-1/4 bg-red-500 rounded-[50px] text-center p-3 mt-5 m-5'>{items.ot[0].link.text}</Link>
                  </div>
                  <div className="lg:w-1/2 p-4">
                    <img src={items.ot[0].image} alt={items.ot[0].title} className="w-full rounded-lg h-auto" />
                  </div>
                </div>
              ))
            }

            {
              features.map((items) => (
                <div key={items.sm[0].id} className="h-auto lg:h-dvh flex flex-col lg:flex-row items-center justify-center md:justify-between p-6">
                  <div className="lg:w-1/2 p-4">
                    <img src={items.sm[0].image} alt={items.sm[0].title} className="w-full rounded-lg h-auto" />
                  </div>
                  <div className="lg:w-1/2 h-auto p-4 flex flex-col justify-between items-center lg:items-end text-center md:text-right">
                    <h1 className="text-4xl font-bold text-gray-800">{items.sm[0].title}</h1>
                    <p className="text-lg text-gray-500 mt-4">{items.sm[0].description}</p>
                    <Link href={items.sm[0].link.url} className='w-full lg:w-1/4 bg-red-500 rounded-[50px] text-center p-3 mt-5 m-5'>{items.sm[0].link.text}</Link>
                  </div>
                </div>
              ))
            }
          </div>

          <div id="services" className="w-auto mx-auto p-4 bg-white">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">What we offer</h1>
            <div className="">
              <Slider {...settings} >
                {
                  services.map((items) => (
                    <div key={items.id} className="border-black border-2">
                      <div>
                        <h2>{items.title}</h2>
                      </div>
                    </div>
                  ))
                }
              </Slider>
            </div>
          </div>

          <div id="services" className="w-full mx-auto p-4 bg-white">
            <h3 className='text-red-500 font-bold text-center w-full'>Benefits</h3>
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Why Choose Eatofy</h1>
            <div className='grid grid-cols-2 gap-8 w-[80dvw] mx-auto'>
              <div className='p-10 bg-zinc-100 shadow-lg shadow-zinc-400 rounded-lg'>
                <FaUsers size={40} className='text-red-600 w-full text-center' />
                <div className='w-full inline-flex flex-col justify-center items-center'>
                  <h2 className='font-bold text-gray-800 text-3xl p-4 text-center'>Speed and Efficiency</h2>
                  <hr className='w-[60px] h-[4px] bg-red-500' />
                </div>
                <p className='p-4 text-center my-2'>Eatofy is designed to be fast, ensuring quick transactions and reducing wait times for customers, leading to higher satisfaction and increased turnover.</p>
              </div>
              <div className='p-10 bg-zinc-100 shadow-lg shadow-zinc-400 rounded-lg'>
                <FaUsers size={40} className='text-red-600 w-full text-center' />
                <div className='w-full inline-flex flex-col justify-center items-center'>
                  <h2 className='font-bold text-gray-800 text-3xl p-4 text-center'>Speed and Efficiency</h2>
                  <hr className='w-[60px] h-[4px] bg-red-500' />
                </div>
                <p className='p-4 text-center my-2'>Eatofy is designed to be fast, ensuring quick transactions and reducing wait times for customers, leading to higher satisfaction and increased turnover.</p>
              </div>
              <div className='p-10 bg-zinc-100 shadow-lg shadow-zinc-400 rounded-lg'>
                <FaUsers size={40} className='text-red-600 w-full text-center' />
                <div className='w-full inline-flex flex-col justify-center items-center'>
                  <h2 className='font-bold text-gray-800 text-3xl p-4 text-center'>Speed and Efficiency</h2>
                  <hr className='w-[60px] h-[4px] bg-red-500' />
                </div>
                <p className='p-4 text-center my-2'>Eatofy is designed to be fast, ensuring quick transactions and reducing wait times for customers, leading to higher satisfaction and increased turnover.</p>
              </div>
              <div className='p-10 bg-zinc-100 shadow-lg shadow-zinc-400 rounded-lg'>
                <FaUsers size={40} className='text-red-600 w-full text-center' />
                <div className='w-full inline-flex flex-col justify-center items-center'>
                  <h2 className='font-bold text-gray-800 text-3xl p-4 text-center'>Speed and Efficiency</h2>
                  <hr className='w-[60px] h-[4px] bg-red-500' />
                </div>
                <p className='p-4 text-center my-2'>Eatofy is designed to be fast, ensuring quick transactions and reducing wait times for customers, leading to higher satisfaction and increased turnover.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

