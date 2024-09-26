'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Link from 'next/link';

export default function Navbar() {

  const [parent, enableAnimations] = useAutoAnimate();
  const [openMobileMenu, setopenMobileMenu] = useState(false);

  function handleOpenMenu() {
    setopenMobileMenu(!openMobileMenu);
  }

  return (
    <nav ref={parent} className="w-full h-auto bg-white absolute top-0 left-0 flex justify-between items-center py-6 px-10 shadow-zinc-200 shadow-md">
      <Image
        src={'/eatofy_logo.svg'}
        width={200}
        height={100}
      />

      <ul className="hidden lg:flex justify-between items-center gap-4">
        <li className='hover:underline-offset-4 hover:underline hover:decoration-red-500'><Link href={'/'}>Home</Link></li>
        <li className='hover:underline-offset-4 hover:underline hover:decoration-red-500'><Link href={'/about'}>About Us</Link></li>
        <li className='hover:underline-offset-4 hover:underline hover:decoration-red-500'><Link href={'#services'}>Services</Link></li>
      </ul>

      <button onClick={handleOpenMenu} className="lg:hidden block">
        <FaBars />
      </button>

      <Link href={'/hotels/auth'} className="hidden lg:block py-2 px-4 bg-red-400 active:bg-red-500 text-white font-bold rounded-lg">get started</Link>

      {
        openMobileMenu && (
          <div className='w-full h-auto absolute top-20 left-0 p-4'>
            <ul>
              <li className='hover:underline-offset-4 hover:underline hover:decoration-red-500'><Link href={'/'}>Home</Link></li>
              <li className='hover:underline-offset-4 hover:underline hover:decoration-red-500'><Link href={'/about'}>About Us</Link></li>
              <li className='hover:underline-offset-4 hover:underline hover:decoration-red-500'><Link href={'#services'}>Services</Link></li>
            </ul>
            <Link href={'/hotels/auth'} className="py-2 px-4 bg-red-400 active:bg-red-500 text-white font-bold rounded-lg">get started</Link>
          </div>
        )
      }
    </nav>
  )
}

