import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import { UserCartContent } from './Cart-Content'
import { IndianRupee } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const CartWrapper = ({cartItems,setOpenCart}) => {

  const totalCartAmount = cartItems.reduce(totalAmount, 0);
  const navigate = useNavigate()

  function totalAmount(currentItem,sum) {
    if (cartItems && cartItems.length > 0) {
      return ( 
        currentItem + 
        (sum?.salePrice > 0
          ? sum?.salePrice
          : sum?.price) * sum?.quantity
      );
    } else {
      return 0;
    }
  }

  return (
    <SheetContent className="sm:max-w-md" >
        <SheetHeader>
            <SheetTitle className="text-center">Your Cart</SheetTitle>
        </SheetHeader>
        <div className='mt-8 space-y-4'>
          {
            cartItems && cartItems.length > 0 ? cartItems.map((cItems)=>
            (
              <UserCartContent cartItem={cItems}/>
            )
            ): null
          }
        </div>
        <div className='mt-8 space-y-4'>
          <div className='flex justify-between'>
            <span className='font-bold mx-4'>Total Amount</span>
            <span className='font-bold mx-2  gap-1 flex items-center'>
              <IndianRupee size={15} className='mt-1' />
              {totalCartAmount}
            </span>
          </div>
          <div className='flex justify-center mt-5 px-2'>
          <Button onClick={()=>{
            navigate('/shopping/checkout')
            setOpenCart(false)
          }

          }
           className='w-full hover:bg-gray-800'>Checkout</Button>
          </div>
        </div>
    </SheetContent>
  )
}
