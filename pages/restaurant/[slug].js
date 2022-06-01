import React, { useState, useEffect } from 'react'
import Img from 'next/image'
import { sanityClient } from '../../sanity'
import { urlFor } from '../../utils'
import { useNextSanityImage } from 'next-sanity-image'
import Map from '../../components/Map'
import { useStateValue } from '../../components/StateProvider'
const Restaurant = (restaurant) => {
  
  const [quantity, setQuantity] = useState(0)
  const dishes = restaurant.dishes
  const imageProps = useNextSanityImage(sanityClient, restaurant.image)

  const getTotal = () => {
    return (dish.price * quantity).toFixed(2)
  }

  return (
    <div>
      <div className="w-full">
        <div className="relative h-[100px] sm:h-[200px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px]">
          <Img {...imageProps} layout="fill" objectFit="cover" />
        </div>

        <div className="mx-3 my-2">
          <p className="text-4xl font-bold"> {restaurant.name} </p>
          <p className="text-gray-500">
            {restaurant.deliveryFee} &#8226;{restaurant.minDeliveryTime} -
            {restaurant.maxDeliveryTime} minutes
          </p>
        </div>

        <p className="mt-20 text-lg "> Menu</p>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dishes.map(({ price, name, image, id }) => (
            <DishItem name={name} image={image} id={id} price={price} />
          ))}
        </div>

        <h2> Location </h2>
      </div>
    </div>
  )
}

export const DishItem = ({ price, name, id, image }) => {

  const [isCart, setCart] = useState(null)

  const imageProps = useNextSanityImage(sanityClient, image)

  return (
    <div className="flex flex-col p-3">
      <div className="relative flex h-36 w-full justify-end p-3 ">
        <Img
          {...imageProps}
          layout="fill"
          className="rounded"
          objectFit="cover"
        />
        <div className="absolute top-2 h-10 w-10">
          <button
            onClick={() => setCart(dishes.find((dish) => dish.id == id))}
            className="mx-auto my-auto h-full  w-full rounded-full bg-white text-2xl shadow-md"
          >
            +
          </button>
        </div>
      </div>

      <div className="">
        <div className="">
          <h1 className="text-lg font-bold"> {name}</h1>
          <h2 className="font-light text-gray-700"> {price} kr</h2>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug

  const query = `*[ _type == "restaurant" && slug.current == $pageSlug][0]{
    name, 
    description,
    location,
    minDeliveryTime,
    maxDeliveryTime,
    foodType,
    image, 
    dishes[]
  
  }`

  const restaurant = await sanityClient.fetch(query, { pageSlug })

  if (!restaurant) {
    return {
      props: null,
      notFound: true,
    }
  } else {
    return {
      props: {
        name: restaurant.name,
        location: restaurant.location,
        description: restaurant.description,
        minDeliveryTime: restaurant.minDeliveryTime,
        maxDeliveryTime: restaurant.maxDeliveryTime,
        foodType: restaurant.foodType,
        image: restaurant.image,
        dishes: restaurant.dishes,
      },
    }
  }
}

export default Restaurant
