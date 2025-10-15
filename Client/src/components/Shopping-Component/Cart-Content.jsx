import React, { Fragment } from "react";
import { Button } from "../ui/button";
import { BrickWallFire, IndianRupee, Minus, Plus, Trash } from "lucide-react";
import {
  deleteItemsFromCart,
  toUpdateTheCart,
} from "@/store/Shopping/Cart-Slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const UserCartContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authenticationSlice);
  const {shopProductList} = useSelector((state)=>state.shopSlice)
  const {cartItems} = useSelector((state)=>state.cartSlice)

  // to render the discount percentage for the items
  const discountPercentage =
    ((cartItem?.price - cartItem?.salePrice) / cartItem?.price) * 100;

  // to delete the cart items
  function handleDelete(getCartItemsId) {
    dispatch(
      deleteItemsFromCart({
        userId: user?.id,
        productId: getCartItemsId?.productId,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast("Product removed from the cart", {
          style: {
            borderRadius: "20px",
          },
        });
      }
    });
  }

  function handleQuantity(getTheCartItems, typeOfAction) {
   
    if(typeOfAction === 'plus'){
      let getCart = cartItems.items || []

      if(getCart.length){

        const CurrentCartItemIndex = getCart.findIndex((product)=> product.productId === getTheCartItems?.productId)
        const getCurrentProductIndex = shopProductList.findIndex((item)=> item._id === getTheCartItems?.productId)
        const getTheTotalStock = shopProductList[getCurrentProductIndex].totalStock
        if(CurrentCartItemIndex > -1){
          const getQuantity = getCart[CurrentCartItemIndex].quantity
          if(getQuantity + 1 > getTheTotalStock){
            toast(`only ${getTheTotalStock} items can be added`,{
              style: {
                backgroundColor: 'red',
                border: 'none',
                borderRadius: '20px',
                color: 'white'
              }
            })
            return
          }

        }

      }

    }

    dispatch(
      toUpdateTheCart({
        userId: user?.id,
        productId: getTheCartItems?.productId,
        quantity:
          typeOfAction === "plus"
            ? getTheCartItems.quantity + 1
            : getTheCartItems.quantity - 1,
      })
    )
  }

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="w-20 h-20 m-2 rounded-2xl object-cover "
        />
        <div className="flex-1">
          <h3 className="font-bold">{cartItem?.title}</h3>
          <div className="flex gap-2 mt-2 items-center">
            <Button
              className="h-5 w-5 rounded-full cursor-pointer"
              onClick={() => handleQuantity(cartItem, "minus")}
              disabled={cartItem?.quantity === 1}
              variant="outline"
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <BrickWallFire size={18} />
            {cartItem?.quantity}
            <Button
              variant="outline"
              className="h-5 w-5 rounded-full cursor-pointer"
              onClick={() =>
                handleQuantity(cartItem, "plus", )
              }
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
        <div className="mx-2">
          <span className=" font-bold">
            &#8377;
            {cartItem?.salePrice > 0
              ? cartItem?.salePrice * cartItem?.quantity
              : cartItem?.price * cartItem?.quantity.toFixed(2)}
          </span>
          <span className="text-red-500 font-light text-[16px]">
            {cartItem?.salePrice > 0 ? (
              <span className="mx-2">
                ({discountPercentage.toFixed()}% OFF )
              </span>
            ) : null}
          </span>
          <span className="flex justify-end cursor-pointer mt-2">
            <Trash onClick={() => handleDelete(cartItem)} />
          </span>
        </div>
      </div>
    </Fragment>
  );
};
