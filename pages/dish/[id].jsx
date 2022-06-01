import React from 'react'
import Image from 'next/image'
import { sanityClient } from '../../sanity'
import { urlFor } from '../../utils'
import DishItem from '../../components/DishItem'

const Dish = (props) => {

  //console.log(name, description, price, image)
  console.log(props)


  
  return (
    <div className="flex-1">
    <p> this is the dishespage</p>
    </div>
  )
}




export const getServerSideProps = async (context) => {
  const id = context.params.id

   const query = `*[ _type == "dish" && id.current == $id][0]{
     name, 
     description,
     price,
     image
   }` 
   const dish = await sanityClient.fetch(query, { id }) 

   if (!dish) {
    return {
      props: null,
      notFound: true,
   }
   } else {
    return {
      props: { 
        
        
        dish
      
      },
    };
    }

}

export default Dish
