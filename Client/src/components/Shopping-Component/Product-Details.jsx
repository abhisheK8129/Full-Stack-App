import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { brandInUpperCase, categoryInUpperCase } from "@/config/Config";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchTheCartItems } from "@/store/Shopping/Cart-Slice";
import { toast } from "sonner";
import { setProductDetails } from "@/store/Shopping/Products-Slice";
import { StarRatingComponent } from "../Common/Star-rating";
import { Label } from "../ui/label";
import { toAddReviews, toGetTheReivews } from "@/store/Shopping/Review-Slice";

export const ProductDetails = ({ open, setOpen, productsDetails }) => {
  const discountPercentage = ((productsDetails?.price - productsDetails?.salePrice) / productsDetails?.price) * 100;
  const { user } = useSelector((state) => state.authenticationSlice);
  const { reviews } = useSelector((state) => state.shopReview);
  const { cartItems } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);


  const averageReview = reviews && reviews.length > 0 ?  reviews.reduce((sum,reviewItem)=>  sum + reviewItem.reviewValue, 0) / reviews.length : 0

  useEffect(()=>{
    if(productsDetails !== null){
      dispatch(toGetTheReivews(productsDetails?._id))
      console.log(reviews,'Reviews');
      
    }
  },[productsDetails])

  function handleRatingChange(getRating) {
    setRating(getRating);
  }


  function handleCart(getCurrentItem, getTheTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentItem
      );
      if (indexOfCurrentItem > -1) {
        const getCurrentQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getCurrentQuantity + 1 > getTheTotalStock) {
          toast(`Only ${getTheTotalStock} items can be added`, {
            style: {
              backgroundColor: "red",
              color: "white",
              borderRadius: "20px",
              border: "none",
            },
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({ userId: user?.id, productId: getCurrentItem, quantity: 1 })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchTheCartItems(user?.id));
        toast("Product added Successfully", {
          style: {
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "20px",
          },
        });
      }
    });
  }

  function handleDialogClosing() {
    dispatch(setProductDetails());
    setOpen(false);
    setRating(0)
    setReviewMsg('')
  }

  function handleAddReview() {
    dispatch(
      toAddReviews({
        productId: productsDetails?._id,
        userId: user?.id,
        username: user?.username,
        reviewMessage:reviewMsg,
        reviewValue:rating
      })
    ).then((data)=>{  
     
      if(data?.payload?.success){ 
        setRating(0);
        setReviewMsg("");
        dispatch(toGetTheReivews(productsDetails?._id));
        toast("Review added successfully!", {
          style: {
            backgroundColor: "blueviolet",
            color: "white",
            border: "none",
          },
        });
      
      }
    })
  }



  return (
    <Dialog open={open} onOpenChange={handleDialogClosing}>
      <DialogContent className="grid grid-cols-2  gap-8  sm:p-12  max-w-[90vw]  sm:max-w-[80vw]  lg:max-w-[60vw] ">
        <div className="relative overflow-hidden">
          <img
            src={productsDetails?.image}
            alt={productsDetails?.title}
            width={800}
            height={800}
            className="w-full rounded-4xl object-cover aspect-squasre"
          />
        </div>
        <div className="grid-cols-1 grid">
          <div>
            <h1 className="text-2xl font-bold ">{productsDetails?.title}</h1>
            <p>{productsDetails?.description}</p>
          </div>
          <div className="flex items-center font-bold">
            Brand:
            <p className="">{brandInUpperCase[productsDetails?.brand]}</p>
          </div>
          <div className=" gap-2 flex font-bold ">
            Category:
            <p className="">{categoryInUpperCase[productsDetails?.category]}</p>
          </div>
          <div className="flex gap-2 flex-wrap   font-bold">
            Price:
            {productsDetails?.salePrice > 0 ? (
              <span>Rs.{productsDetails?.salePrice}</span>
            ) : null}
            <span
              className={`${
                productsDetails?.salePrice > 0 ? "line-through" : ""
              }  `}
            >
              Rs.{productsDetails?.price}
            </span>
            {productsDetails?.salePrice &&
            productsDetails?.price > productsDetails?.salePrice ? (
              <span className="text-red-600 font-semibold">
                {`${discountPercentage.toFixed()}% OFF`}
              </span>
            ) : null}
          </div>
          <div className="flex gap-1 items-center font-bold flex-1 ">
            Review:
            <div className="flex  items-center gap-1">
              <StarRatingComponent rating={averageReview} />
            <span className="text-black">
              ({averageReview.toFixed(1)})
            </span>
            </div>
          </div>

          <div className=" mb-7 mt-5 ">
            {productsDetails?.totalStock === 0 ? (
              <Button className="w-full cursor-not-allowed opacity-65">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleCart(productsDetails?._id, productsDetails?.totalStock)
                }
              >
                Add to cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4  ">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-9 h-9 border-2 border-black">
                      <AvatarFallback>
                        {reviewItem.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem.username}</h3>
                      </div>
                      <div className="flex items-center gap-1 ">
                        <StarRatingComponent rating={reviewItem.reviewValue} />
                      </div>
                      <p className="text-gray-700 font-light text-[14px]">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 flex flex-col gap-2 mx-2">
              <Label className="mb-1 font-bold">Write a review</Label>
              <div className="flex gap-0.5">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                placeholder="write your comment here"
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                className="border-2 border-black focus-visible:border-none"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
