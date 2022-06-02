import { HeartIcon, StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import PizzaImage from '../assets/pizzaImage.jpeg'
import { urlFor } from '../utils'

const InfoCard = ({ image, name }) => {
  return (
    <div
      className="flex cursor-pointer border-b py-7 px-2 pr-4 
        transition duration-200 ease-out first:border-t hover:opacity-80 hover:shadow-lg"
    >
      <div className="relative h-24 w-40 flex-shrink-0 md:h-52 md:w-80">
        <Image src={PizzaImage} layout="fill" objectFit="cover" />
      </div>

      <div className="flex flex-grow flex-col pl-5">
        <div className="flex justify-between">
          <p>placeholder</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>

        <h4 className="text-xl">{name}</h4>
        <div className="w-10 border-b pt-2" />

        <p className="flex-grow pt-2 text-sm text-gray-500">placeholder</p>

        <div className="flex items-end justify-between">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>

          <div>
            <p className="text-large pb-2 font-semibold lg:text-2xl">
              placeholder
            </p>
            <p className="text-right font-extralight"> placeholder </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
