import React from 'react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClient } from '../sanity'
import { urlFor } from '../utils'


const CategoryCard = ({name, image}) => {
    const imageProps = useNextSanityImage(sanityClient, image)
    return (
 <div className="flex items-center m-2 mt-5 space-x-4 
 rounded-xl cursor-pointer  hover:scale-105 
 transition transform duration-200 ease-out">
           
       <div className="flex items-center justify-center relative h-16 w-16 border-2 rounded-full border-black">
           <Image
           {...imageProps}       
           width={50}
           height={50}
           />

           
       </div>

        <div>
            <h2 className='font-extrabold'> {name} </h2>

        </div>

 </div>

    )
}

  
export default CategoryCard
