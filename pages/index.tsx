import type { NextPage } from 'next'

import { sanityClient } from '../sanity'
import Restaurant from './restaurant/[slug]'
import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'

import LargeCard from '../components/LargeCard'
import RestaurantCard from '../components/RestaurantCard'
import CategoryCard from '../components/CategoryCard'
import { useNextSanityImage } from 'next-sanity-image'
import { useState, useEffect } from 'react'
import { useStateValue } from '../redux/StateProvider'
import { actionType } from '../redux/reducer'


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
    if (props.restaurants) {
      dispatch({
        type: actionType.SET_RESTAURANTS,
        restaurants: props.restaurants,
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
              <div key={category.id} onClick={() => setData(category.name)}>
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
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
          </div>
        </section>

        <section className="">
          <LargeCard
           
            image="https://links.papareact.com/4cj"
            title="The Greatest Outdoors"
          />
        </section>
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
