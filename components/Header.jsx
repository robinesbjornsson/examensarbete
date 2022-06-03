import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  SearchIcon,
  MenuIcon,
  UserCircleIcon,
  UserIcon,
  GlobeIcon,
  GlobeAltIcon,
  UsersIcon,
  ShoppingCartIcon,
} from '@heroicons/react/solid'

import { useRouter } from 'next/dist/client/router'
import { useStateValue } from '../redux/StateProvider'



function Header() {
  const [{ cart }, dispatch] = useStateValue();



  // useEffect(() => {
  //   const toggleIcon = document.querySelector('.toggleMenu')
  //   toggleIcon.addEventListener('click', () => {
  //     document.querySelector('.rightMenu').classList.toggle('active')
  //   })
  // }, [])

  const router = useRouter()

  return (
    <header className=" top-0 z-50 grid grid-cols-3 bg-white p-5 md:px-10 sticky">
      <div
        onClick={() => router.push('/')}
        className="relative my-auto flex h-10 cursor-pointer items-center"
      >
        {/* left */}
        <div>
         <h2 className='sm:text-sm text-xl font-bold'> Food Delivery App </h2>
        </div>
      </div>
      {/* Middle - Search */}

      <div className="flex items-center bg-gray-100 py-2 ">
        <input
          className="flex-grow bg-transparent pl-5 text-sm text-gray-600 placeholder-gray-400 outline-none"
          type="text"
        />
        <SearchIcon className="hidden h-8 cursor-pointer rounded-full bg-gray-700 p-2 text-white md:mx-2 md:inline-flex" />
      </div>

      {/* Right */}
      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <div className="flex items-center space-x-2 rounded-full p-2">
          <p className="hidden md:inline ">{cart ? cart.length : ""}</p>
          <div className="toggleMenu">
            <ShoppingCartIcon className="h-6" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
