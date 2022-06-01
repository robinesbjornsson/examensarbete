import { HeartIcon, StarIcon } from "@heroicons/react/solid"
import Image from "next/image"

import { urlFor } from '../utils'

const InfoCard = ({image, name}) => {
    return (
        <div className="flex py-7 px-2 pr-4 border-b cursor-pointer 
        hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">

            <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                <Image 
            src="https://links.papareact.com/0fm"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            />
            </div>

            <div className="flex flex-col flex-grow pl-5">
                <div className="flex justify-between">
                    <p>placeholder</p>
                    <HeartIcon className="h-7 cursor-pointer" />
                </div>

                <h4 className="text-xl">{name}</h4>
                <div className="border-b w-10 pt-2" />

                <p className="pt-2 text-sm text-gray-500 flex-grow">placeholder</p>
 
                <div className="flex justify-between items-end">
                <p className="flex items-center">
                <StarIcon className="h-5 text-red-400" />
                {star}
                </p>

                <div>
                    <p className="text-large lg:text-2xl font-semibold pb-2">placeholder</p>
                    <p className="text-right font-extralight"> placeholder </p>
                </div>
                </div>
           

            </div>

        </div>
    )
}

export default InfoCard
