import { AddRounded, RemoveRounded } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { actionType } from '../redux/reducer'
import { useStateValue } from '../redux/StateProvider'
let cartItems = []
const CartItem = ({ name, imgSrc, price, id, itemId }) => {
  const [qty, setQty] = useState(1)
  const [{ cart, total }, dispatch] = useStateValue()
  const [itemPrice, setItemPrice] = useState(0)

  useEffect(() => {
    cartItems = cart
    setItemPrice(parseInt(qty) * parseFloat(price))
  
    console.log('total price;' , total)
  }, [qty])

  const updateQuantity = (action, id) => {
    console.log('hello', action)
    if (action == 'add') {
      setQty(qty + 1)
      console.log(qty)
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
    <div className="mx-2 flex items-center">
      <div className="min-w-16 h-16 w-16 ">
        <img src={imgSrc} />
      </div>

      <div classItem="ml-10">
        <h2 className="text-sm">{name} </h2>
        <div className="flex w-[150px] items-center justify-between">
          <span>x{qty}</span>
          <div className="flex w-[60px] cursor-pointer items-center justify-between border-2 border-red-200">
            <RemoveRounded
              className="border-red-500 text-lg"
              onClick={() => updateQuantity('remove', itemId)}
            />

            <AddRounded
              className="border-2 border-green-500"
              onClick={() => updateQuantity('add', itemId)}
            />
          </div>
        </div>
      </div>

      <p className="itemPrice">
        <span className="text-orange text-sm"> $ </span>
        <span className="text-sm"> {itemPrice} </span>
      </p>
    </div>
  )
}

export default CartItem
