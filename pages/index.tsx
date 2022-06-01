import type { NextPage } from 'next'
import styles from '../styles.module.css'
import { sanityClient } from '../sanity'
import Restaurant from './restaurant/[slug]'
import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LargeCard from '../components/LargeCard'
import RestaurantCard from '../components/RestaurantCard'
import CategoryCard from '../components/CategoryCard'
import CartItem from '../components/CartItem'
import { useNextSanityImage } from 'next-sanity-image'
import { useState, useEffect } from 'react'
import { useStateValue } from '../components/StateProvider'
import { actionType } from '../Components/reducer'


interface Restaurant {
  id: number
  name: string
  image: any
  foodType: string
}
interface Category {
  id: number
  name: string
  image: any
}
interface HomePageProps {
  restaurants: Restaurant[]
  categories: Category[]
}

const Home: NextPage<HomePageProps> = (props) => {
  
  const [isMainData, setMainData] = useState(
    props.restaurants.filter((element) => element.foodType === 'Burger')
  )

  useEffect(() => {
    if(props.restaurants) {
      dispatch({
        type: actionType.SET_RESTAURANTS,
        restaurants: props.restaurants
      })

    }
  }, [props])

  const [{}, dispatch] = useStateValue()

  const setData = (name: string) => {
    console.log(name)
    setMainData(
      props.restaurants.filter((element) => element.foodType === name)
    )
  }


  //  {props.restaurants.map(element => console.log(element.foodType))}

  return (
    <div>
      <Head>
        <title> Food Order App </title>
      </Head>
       <Header />
      <Banner />

      <main className="mx-auto max-w-7xl px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="pb-5 text-4xl font-semibold"> Kategorier </h2>

          {/* Pull some data from a server - API endpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {props.categories.map((category) => (
              <div onClick={() => setData(category.name)}>
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  image={category.image}
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="py-8 text-4xl font-semibold">
            {' '}
            Restauranger nära dig{' '}
          </h2>
          <div className="flex grid-cols-3 flex-col items-center md:grid md:grid-cols-2 lg:grid">
            {isMainData &&
              isMainData.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} />
              ))}
          </div>
        </section>

        <section className="">
          <LargeCard
            image="https://links.papareact.com/4cj"
            title="The Greatest Outdoors"
          />
        </section>

        <div
        className={` ${styles.rightMenu} `}
         
        >
          <div className="cartCheckOutContainer">
            <div className="mt-2 w-full min-w-[320px] flex-1 py-10 ">
              <CartItem
                name={'Burger bistro'}
                imgSrc={
                  'https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fdrink4.png?alt=media&token=eaaa8826-7fc0-499f-9eaf-8369ff99c112'
                }
                price="7.95"
              />
            </div>
           
          </div>
          <div className="m-15 flex w-full items-center justify-between px-5 py-8">
            <h3> Total </h3>
            <p>
              <span> $ 45.0</span>
            </p>
          </div>
          <button
            className="w-full 
           bg-black px-10 py-5 text-lg font-semibold tracking-wider text-gray-100 outline-none"
          >
            Checkout
          </button>
        </div>
      </main>
    </div>
  )
}


export const getServerSideProps = async () => {
  const queryOne = '*[ _type == "restaurant" ]'
  const restaurants = await sanityClient.fetch(queryOne)
  const queryTwo = '*[ _type == "category" ]'
  const categories = await sanityClient.fetch(queryTwo)

  if (!restaurants.length && !categories.length) {
    

    return {
      props: {
        restaurants: [],
        categories: [],
      },
    }
  } else {
    return {
      props: {
        restaurants,
        categories,
      },
    }
  }
}

export default Home
