import { AddRounded, RemoveRounded } from '@mui/icons-material'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { actionType } from '../redux/reducer'
import { useStateValue } from '../redux/StateProvider'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClient } from '../sanity'

let cartItems = []
const CartItem = ({ name, imgSrc, price, id, itemId }) => {
  const [qty, setQty] = useState(1)
  const [{ cart, total, quantity }, dispatch] = useStateValue()
  const [itemPrice, setItemPrice] = useState(parseInt(qty) * parseFloat(price))
  const imageProps = useNextSanityImage(sanityClient, imgSrc)

  useEffect(() => {
    cartItems = cart
    setItemPrice(parseInt(qty) * parseFloat(price))
    console.log(cart.length)
  }, [qty])

  const updateQuantity = (action, id) => {
    if (action == 'add') {
      setQty(qty + 1)
    } else {
      if (qty == 1) {
        cartItems.pop(id)
        dispatch({
          type: actionType.SET_CART,
          cart: cartItems,
        })
      }
      setQty(qty - 1)
    }
  }

  return (
    <div className="mx-2 my-2 items-center border-b-2 border-b-gray-200">
      <div className="flex flex-col items-center justify-center">
        <div className="min-w-14 h-16 w-14 ">
          <Image {...imageProps} />
        </div>

        <h2 className="text-sm">
          {name} <span>x{qty}</span>{' '}
        </h2>
      </div>

      <div className="m-2 flex w-full items-center justify-between">
        <div className="flex w-[60px] cursor-pointer items-center justify-between">
          <RemoveRounded
            className=""
            onClick={() => updateQuantity('remove', itemId)}
          />
          <AddRounded onClick={() => updateQuantity('add', itemId)} />
        </div>

        <div className="border-red-500">
          <p className="itemPrice ">
            <span className="text-sm"> $ </span>
            <span className="text-sm"> {itemPrice} </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartItem
