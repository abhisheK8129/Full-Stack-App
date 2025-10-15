import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { deleteProducts } from "@/store/admin/Product-Slice";
import { motion } from "framer-motion";

export const AdminProductTile = ({ setFormData, setOpenDialog, product, setCurrentEditedId,toDeleteProducts }) => {

  // to calculate the discount percentage reduce the original and salePrice and divide it by the original price then mutliply the whole value by 100.
  const discountPercentage = ((product.price - product.salePrice) / product.price) * 100 

  return (
    <motion.div whileHover={{y:[0,-2,2,0]}}>
    <Card className="w-full mx-auto max-w-sm">
      <div>
      <CardContent>
        <img src={product.image} alt={product.title} className="rounded-lg object-cover w-full h-[200px]" />
      </CardContent>
      <CardContent>
        <div className="flex justify-between">
        <h2>{product.title}</h2>
        <h2>{product.brand}</h2>
        </div>
        <h4 className="font-medium text-shadow-violet-300 text-shadow-lg">{product.description}</h4>
        <div className="flex gap-3 leading-8 items-center text-[16px]">
            {
              product.salePrice > 0
                ? 
              (<span>Rs.{product?.salePrice}</span>) 
              :
              null
            } 
            <span  className={`${product.salePrice > 0 ? "line-through font-light": ""} `}>
              Rs.{product.price}
            </span>

            <span className="font-medium text-[14px] text-red-500">
              (
              {discountPercentage.toFixed()}
              )%OFF
            </span>
           
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-2">
        {/* on the click of  this button edit the product and open the dialog and set the form data to setFormData  */}
        <Button onClick={()=>{
          setCurrentEditedId(product._id);
          setOpenDialog(true);
          setFormData(product);
        }} className="hover:bg-adminEditBtn font-bold rounded-2xl">
          Edit
        </Button>
        <Button className="hover:bg-adminDelbtn font-bold rounded-2xl" onClick={()=>toDeleteProducts(product?._id)}>
          Delete
        </Button>
      </CardFooter>
      </div>
    </Card>
              </motion.div>

  );
};
