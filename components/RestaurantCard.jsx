import React from 'react'
import Img from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClient } from '../sanity'
import { useRouter } from 'next/router'

import { urlFor } from '../utils'

const RestaurantCard = ({ restaurant }) => {
  const imageProps = useNextSanityImage(sanityClient, restaurant.image)

  const router = useRouter()

  const handleClick = () => {
    router.push(`./restaurant/${restaurant.slug.current}`)
  }

  // rating maxDeliveryTime, minDeliveryTime,
  //
  return (
    <div className=" w-full cursor-pointer p-3" onClick={handleClick}>
      <div className="bg-gray-100">
        <div className="relative h-[100px] sm:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px]">
          <Img {...imageProps} layout="fill" objectFit="cover" />
        </div>

        <div className="flex flex-row items-center">
          <div className="p-2">
            <h1 className="text-lg font-bold"> {restaurant.name}</h1>
            <h2 className="font-light text-gray-700">
              {' '}
              {restaurant.deliveryFee} SEK &#8226;
              {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime}{' '}
              minutes{' '}
            </h2>
          </div>

          <div className="mx-5 ml-auto flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200">
            <p>{restaurant.rating}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
