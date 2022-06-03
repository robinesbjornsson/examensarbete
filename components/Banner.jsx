import React from 'react'
import Image from 'next/image'

const Banner = () => {
    return (
        <div className="relative h-[200px] sm:h-[200px] lg:h-[300px] xl:h-[300px] 2xl:h-[300px]">
         
           <div className="absolute top-1/2 w-full text-center font-bold">
               <h1 className="text-5xl text-gray-50"> What's for dinner? </h1>

           </div>
        </div>
    )
}

export default Banner
