import React, { useState } from "react";
import checkoutImg from "../../assets/Home Page Slides/slide-1.jpg";
import { Address } from "@/components/Shopping-Component/Address";
import { useDispatch, useSelector } from "react-redux";
import { UserCartContent } from "@/components/Shopping-Component/Cart-Content";
import { Card, CardContent } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/Shopping/Order-Slice";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const CheckoutPage = () => {
  const { cartItems } = useSelector((state) => state.cartSlice);
  const {user} = useSelector((state)=>state.authenticationSlice)
  const [currAddress,setCurrAddress] = useState(null)
  const dispatch  = useDispatch()
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  const {approvalUrl} = useSelector((state)=>state.shopOrder)

  // to handle the paypal payment 
  function handleInitiatePaypalPayment() {
    // if the cart is empty
    if(cartItems.items.length === 0){
      toast('Your cart is empty!',{
        style:{
          backgroundColor:'red',
          color: 'white',
        }
      })
      return;
    }



    // atleas choose one address
      if(currAddress === null){
    toast('Please select the address',{
      style:{
        backgroundColor: 'coral',
        borderRadius: '20px'
      }
    })
    return
  }


    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: 
        cartItems.items.map((itemsOfCart)=>({
          productId: itemsOfCart?.productId ,
          title: itemsOfCart?.title,
          image: itemsOfCart?.image,
          price: itemsOfCart?.salePrice > 0 ? itemsOfCart?.salePrice : itemsOfCart?.price,
          quantity: itemsOfCart?.quantity,
        })),
      addressInfo: {
         addressId: currAddress?._id,
        address: currAddress?.address,
        city: currAddress?.city,
        pincode:currAddress?.pincode,
        phoneNo: currAddress?.phoneNo,
        country: currAddress?.country,
        landmark: currAddress?.landmark
  },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '',
    };
    
    dispatch(createNewOrder(orderData)).then((data)=>{
      console.log(data,'created the new order');
      if(data?.payload?.success){
        setIsPaymentStart(true)
      }
      else{
        setIsPaymentStart(false)
      }
      
    })
  }

  // 

  

  // if there is approval url then do 
  if(approvalUrl){
    window.location.href = approvalUrl
  }

  

  const totalAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currentItem) => {
          const price =
            currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price;
          const quantity = currentItem?.quantity;
          return sum + price * quantity;
        }, 0)
      : 0;

  return (
    <div className="flex flex-col ">
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src={checkoutImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 m-5 gap-5">
        <Address selectedId={currAddress} setCurrAddress={setCurrAddress} />
        <div className="flex flex-col gap-4">
          <Card>
            {cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item) => (
                  <UserCartContent cartItem={item} />
                ))
              : null}
          </Card>
          <div className="flex justify-between">
            <span className="font-bold mx-4">Total Amount</span>
            <span className="font-bold mx-2  gap-1 flex items-center">
              <IndianRupee size={15} className="mt-1" />
              {totalAmount}
            </span>
          </div>
          <div>
            <Button
              onClick={handleInitiatePaypalPayment}
              className="rounded-4xl w-full mt-5"
            >
              {
                isPaymentStart ? 'Processing with PayPal...'
                : 
                'Checkout with PayPal'


              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
