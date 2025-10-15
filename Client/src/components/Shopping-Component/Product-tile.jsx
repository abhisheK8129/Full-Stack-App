import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandInUpperCase } from "@/config/Config";
import { motion } from "framer-motion";

export const ShoppingProductTile = ({
  products,
  toHandleDetails,
  handleAddToCart,
}) => {
  const discountPercentage =
    ((products?.price - products?.salePrice) / products?.price) * 100;

  return (
    <motion.div whileHover={{ y: [0, -2, 2, 0] }}>
      <Card className="max-w-sm min-w-0 bg-cardBgClr py-0 w-full">
        {/* image of the products */}
        <div onClick={() => toHandleDetails(products?._id)}>
          <div className="relative">
            <img
              src={products.image}
              className="object-cover w-full h-[200px] rounded-t-lg"
              alt={products.title}
            />

            {products?.totalStock === 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-900">
                out of stock
              </Badge>
            ) : products?.totalStock <= 10 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-900">{`Only ${products.totalStock} items left`}</Badge>
            ) : null}
            {products.salePrice > 0 ? (
              <Badge className="absolute top-15 left-8 bg-red-500 hover:bg-red-900">
                Sale is on
              </Badge>
            ) : null}
          </div>
          <CardContent className="p-4">
            {/* products title */}
            {/* products category and brand */}
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-lg textblack">
                {brandInUpperCase[products?.brand]}
              </span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-light  text-black">
                {products?.description}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap  items-center font-bold">
              {products.salePrice > 0 ? (
                <span>Rs.{products?.salePrice}</span>
              ) : null}
              <span
                className={`${products.salePrice > 0 ? "line-through" : ""} `}
              >
                Rs.{products.price}
              </span>
              {products?.salePrice && products?.price > products?.salePrice ? (
                <span className="text-red-600 font-semibold">
                 ({`${discountPercentage.toFixed()}% OFF`})
                </span>
              ) : null}
            </div>
          </CardContent>
        </div>
        <CardFooter>
          {products?.totalStock === 0 ? (
            <Button className="w-full mb-3 rounded-2xl opacity-65 cursor-not-allowed">
              Out of stock
            </Button>
          ) : (
            <Button
              className="w-full mb-3 rounded-2xl"
              onClick={() =>
                handleAddToCart(products?._id, products?.totalStock)
              }
            >
              Add to cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};
