import { AddRounded, RemoveRounded } from '@mui/icons-material';
import {useState} from 'react';

const CartItem = ({ name, imgSrc, price}) => {
    const [ qty, setQty ] = useState(1)

  return (
    <div className='flex items-center mx-2'>
      <div className='w-16 h-16 min-w-16 '>
        <img src={imgSrc} />
      </div>

      <div classItem='ml-10'>
        <h2 className='text-sm'>{name} </h2>
        <div className='flex items-center justify-between w-[150px]'>
          <span>x{qty}</span>
          <div className='flex items-center justify-between cursor-pointer w-[60px]'>
            <RemoveRounded className='text-lg' />

            <AddRounded className='text-lg' />
          </div>
        </div>
      </div>

      <p className='itemPrice'>
        <span className='text-sm text-orange'> $ </span>
        <span className='text-sm'> {price} </span>
      </p>
    </div>
  );
};

export default CartItem;
