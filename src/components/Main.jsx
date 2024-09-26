'use client';

import Image from 'next/image';
import React from 'react'
import Typewriter from 'typewriter-effect'

export default function MainPage() {

  const MarqueContent = [
    {
      id: 1,
      img: 'https://d28ewddc5mocr5.cloudfront.net/images/Pizzeria/la-pinoz-pizza.webp',
    },
    {
      id: 2,
      img: 'https://d28ewddc5mocr5.cloudfront.net/images/QSR/Star-Biryani-Logo.webp',
    },
    {
      id: 3,
      img: 'https://d28ewddc5mocr5.cloudfront.net/images/Food-Court-Canteen/jumbo-king.webp',
    },
    {
      id: 4,
      img: 'https://d28ewddc5mocr5.cloudfront.net/images/fine-dine/Hocco.webp',
    },
    {
      id: 5,
      img: 'https://d28ewddc5mocr5.cloudfront.net/images/Large-Chains/gianis.webp',
    },
    {
      id: 6,
      img: 'https://d28ewddc5mocr5.cloudfront.net/images/Food-Court-Canteen/4.webp',
    },
    {
      id: 7,
      img: 'https://d28ewddc5mocr5.cloudfront.net/images/Bakery/kabhib.webp',
    },
    {
      id: 8,
      img: 'https://d28ewddc5mocr5.cloudfront.net/images/ice-cream-and-dessert/apsara.webp',
    },
    {
      id: 9,
      img: 'https://d28ewddc5mocr5.cloudfront.net/images/Large-Chains/bercos.webp',
    },
    {
      id: 10,
      img: 'https://d28ewddc5mocr5.cloudfront.net/images/fine-dine/kailash-parbat.webp',
    },
  ]

  const services = [
    {
      "id": "1",
      "title": "Order Management",
      "description": "Our Order Management service streamlines the process of handling customer orders, from initial placement to final delivery, ensuring efficiency and accuracy.",
      "features": [
        "Centralized order processing",
        "Real-time inventory updates",
        "Automated invoicing",
        "Customer communication tools",
        "Detailed reporting and analytics"
      ],
      "imageSource": "/s1.png",
      "link": {
        "url": "/features/emc",
        "text": "View details"
      }
    },
    {
      "id": "2",
      "title": "Inventory Management",
      "description": "Our Inventory Management service provides comprehensive tools to track and manage your inventory in real-time, ensuring optimal stock levels and minimizing losses.",
      "features": [
        "Real-time inventory tracking",
        "Automated stock alerts",
        "Detailed inventory reports",
        "Supplier management",
        "Barcode scanning support"
      ],
      "imageSource": "/s2.png",
      "link": {
        "url": "/features/emc",
        "text": "View details"
      }
    },
    {
      "id": "3",
      "title": "Video Marketing",
      "description": "Our Video Marketing service helps you create engaging video content to promote your brand, reach a wider audience, and drive conversions.",
      "features": [
        "Professional video production",
        "Targeted video campaigns",
        "SEO-optimized content",
        "Social media integration",
        "Analytics and performance tracking"
      ],
      "imageSource": "/s3.png",
      "link": {
        "url": "/features/emc",
        "text": "View details"
      }
    },
    {
      "id": "4",
      "title": "Kitchen Order Ticket",
      "description": "Our Kitchen Order Ticket system streamlines the process of handling orders in the kitchen, ensuring accuracy and efficiency in meal preparation and delivery.",
      "features": [
        "Real-time order updates",
        "Easy-to-read ticket format",
        "Order prioritization",
        "Customizable ticket settings",
        "Integration with POS systems"
      ],
      "imageSource": "/s4.png",
      "link": {
        "url": "/features/emc",
        "text": "View details"
      }
    },
    {
      "id": "5",
      "title": "Staff Salary Management",
      "description": "Our Staff Salary Management service simplifies the process of managing employee salaries, including calculations, deductions, and payments. Ensure accurate and timely salary processing with ease.",
      "features": [
        "Automated salary calculations",
        "Customizable deduction options",
        "Salary disbursement tracking",
        "Detailed payroll reports",
        "Integration with tax and accounting systems"
      ],
      "imageSource": "/s5.png",
      "link": {
        "url": "/features/emc",
        "text": "View details"
      }
    },
    {
      "id": "6",
      "title": "Marketing",
      "description": "Our Marketing service offers comprehensive solutions to boost your brand's presence and drive growth through targeted campaigns and strategic outreach.",
      "features": [
        "Targeted advertising campaigns",
        "SEO and content marketing",
        "Social media management",
        "Market research and analysis",
        "Performance tracking and analytics"
      ],
      "imageSource": "/s6.png",
      "link": {
        "url": "/features/emc",
        "text": "View details"
      }
    },
    {
      "id": "7",
      "title": "Other Relevant Features",
      "description": "Explore our range of other relevant features designed to enhance various aspects of your business operations and provide additional value beyond our core services.",
      "features": [
        "Reservation Management",
        "Billing and Invoicing",
        "Feedback and Reviews",
        "Multi-location Support"
      ],
      "imageSource": "/s7.png",
      "link": {
        "url": "/features/emc",
        "text": "View details"
      }
    }
  ]

  return (
    <>
      <section className='w-full h-full flex justify-evenly items-center lg:flex-row flex-col-reverse'>
        <div className='lg:w-auto w-full px-8 flex justify-center items-center lg:items-start flex-col mt-10'>
          <h1 className='lg:text-6xl text-3xl font-semibold lg:w-[600px] drop-shadow-lg'>
            Powering all the ways you do <span className='text-red-400'>Business</span>
          </h1>
          <p className='text-base lg:text-xl lg:w-[500px] w-auto my-7'>
            Work smarter, automate for efficiency, and open up new revenue streams on the software and hardware platform millions of business trust.
          </p>
          <div className='my-4 flex justify-start items-center gap-4'>
            <button className='bg-red-400 active:bg-red-500 text-white py-[10px] px-6 rounded-lg'>Buy now</button>
            <button className='border-red-400 border-2 active:bg-red-500 py-2 px-4 rounded-lg'>Contact us</button>
          </div>
        </div>
        <div className='lg:w-auto mt-[300px] lg:mt-0 w-full flex justify-center items-center'>
          <Image
            src={'/banner.png'}
            width={500}
            height={400}
          />
        </div>
      </section>
      <section id='services' className='w-full h-auto mt-[300px] lg:mt-0'>
        <div className='w-[80%] mx-auto h-fit hidden md:flex justify-center flex-col'>
          <div className='Marque'>
            <div className='MarqueGroup'>
              {MarqueContent.map((items, index) => (
                <div key={index} className='w-[100px] h-[100px]'>
                  <img src={items.img} alt='Photo' className='w-auto h-[100px]' />
                </div>
              ))}
            </div>
            <div className='MarqueGroup'>
              {MarqueContent.map((items, index) => (
                <div key={index} className='lg:w-[100px] w-auto h-[100px]'>
                  <img src={items.img} alt='Photo' className='w-auto h-[100px]' />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="my-28 w-[80%] mx-auto">
          <div className="heading flex justify-center items-center md:justify-end md:items-end flex-col gap-2">
            <h1 className="text-4xl lg:text-5xl  font-bold text-[#ef4444] text-center">
              Welcome to Eatofy, your trusted partner
            </h1>
            <p className="text-slate-400 lg:text-lg lg:text-right text-center">
              At Eatofy, we understand the unique challenges of the hospitality sector and are committed to providing innovative tools that empower your business to thrive. Join us in transforming the way you manage your establishment and deliver exceptional service to your guests.
            </p>
          </div>
          <div className="service my-16">
            {services.map((items, index) => (
              <div className={`service-1 flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} justify-center items-center gap-5 lg:gap-20 mb-5 md:mb-8`}>
                <img src={items.imageSource} alt="" className="lg:w-1/4 w-auto  xl:w-full" />
                <div className="details flex items-center flex-col gap-5 order-2">
                  <h2 className="text-red-400 text-center font-semibold lg:text-xl text-3xl 2xl:text-4xl">
                    {items.title}
                  </h2>
                  <p className="text-black text-center xl:text-lg 2xl:text-xl">
                    {items.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

