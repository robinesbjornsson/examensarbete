import React, { useState, useEffect } from 'react'
import Img from 'next/image'
import styles from '../../styles.module.css'
import { sanityClient } from '../../sanity'
import { useNextSanityImage } from 'next-sanity-image'
import Map from '../../components/Map'
import { useStateValue } from '../../redux/StateProvider'
import Header from '../../components/Header'
import CartItem from '../../components/CartItem'
import { actionType } from '../../redux/reducer'
import Link from 'next/link'
const cartData = []

const Restaurant = (restaurant) => {
  const dishes = restaurant.dishes
  const imageProps = useNextSanityImage(sanityClient, restaurant.image)
  const [{ cart, isOpen }, dispatch] = useStateValue()

  return (
    <div>
      <Header itemsInCart={cartData.length} />
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
          {dishes.map((dish) => (
            <DishItem key={dish.id} dish={dish} />
          ))}
        </div>

        {isOpen || cart.length == 0 ? (
          <div></div>
        ) : (
          <div className={` ${styles.rightMenu} `}>
    
            <div className="cartCheckOutContainer flex  h-full flex-col">
              <div className="mt-2 w-full min-w-[320px] flex-1 py-10  ">
                {cart &&
                  cart.map((data) => (
                    <CartItem
                      key={data.id}
                      itemId={data.id}
                      name={data.name}
                      imgSrc={data.image}
                      price={data.price}
                    />
                  ))}
              </div>

              <div className=" bottom-0 mb-20 p-2">
                <div className=" m-15 flex w-full items-center justify-between px-5 py-8">
                  <h3> Total </h3>
                  <p>
                    <span> </span>
                  </p>
                </div>

                <Link href={`/orders/124`}>
                  <button
                    className="w-full 
      bg-black px-10 py-5 text-lg font-semibold tracking-wider text-gray-100 outline-none"
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        <h2> Location </h2>

        <div>


          <Map location={restaurant.location} />
        </div>
      </div>
    </div>
  )
}

export const DishItem = ({ dish }) => {
  const [isCart, setCart] = useState(null)
  const [{ cart, isOpen }, dispatch] = useStateValue()
  const [itemPrice, setItemPrice] = useState(0)

  function addToCart(dish) {
    setCart(dish)
    dispatch({
      type: actionType.SET_OPEN,
      open: !isOpen,
    })
  }

  useEffect(() => {
    if (isCart) {
      cartData.push(isCart)
      dispatch({
        type: actionType.SET_CART,
        cart: cartData,
      })
    }
  }, [isCart])

  const imageProps = useNextSanityImage(sanityClient, dish.image)

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
            onClick={() => addToCart(dish)}
            className="mx-auto my-auto h-full  w-full rounded-full bg-white text-2xl shadow-md"
          >
            +
          </button>
        </div>
      </div>

      <div className="">
        <div className="">
          <h1 className="text-lg font-bold"> {dish.name}</h1>
          <h2 className="font-light text-gray-700"> {dish.price} kr</h2>
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
