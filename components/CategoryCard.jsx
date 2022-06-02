import React from 'react'
import Image from 'next/image'
import { sanityClient } from '../sanity'

const CategoryCard = ({ name, emoji }) => {
  return (
    <div
      className="mt-5 flex transform cursor-pointer 
 items-center space-x-3
 transition duration-200 ease-out hover:scale-105"
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
        <h1 className="text-5xl"> {emoji}</h1>
      </div>

      <div>
        <h2 className="font-bold"> {name} </h2>
      </div>
    </div>
  )
}

export default CategoryCard
