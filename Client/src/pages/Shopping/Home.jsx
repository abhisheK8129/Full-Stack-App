import React, { useEffect, useState } from "react";
import slide1 from '../../assets/Home Page Slides/slide-1.jpg'
import slide2 from "../../assets/Home Page Slides/slide-2.jpg";
import slide3 from "../../assets/Home Page Slides/slide-3.jpg";
import { Button } from "@/components/ui/button";
import nikeIcon from "../../assets/Brand-Icons/nike.png";
import adidasIcon from "../../assets/Brand-Icons/adidas.png";
import pumaIcon from "../../assets/Brand-Icons/puma.png";
import levisIcon from "../../assets/Brand-Icons/Levis.png";
import zaraIcon from "../../assets/Brand-Icons/zara.png";
import hmIcon from "../../assets/Brand-Icons/h&m.png";
import jblIcon from "../../assets/Brand-Icons/jbl.png";
import hpIcon from "../../assets/Brand-Icons/hp.png";
import {
  BabyIcon,
  ChevronLeftCircle,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Footprints,
  ShirtIcon,
  WatchIcon,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProducts, getTheProductsDetails } from "@/store/Shopping/Products-Slice";
import { ShoppingProductTile } from "@/components/Shopping-Component/Product-tile";
import { useNavigate } from "react-router-dom";
import { ProductDetails } from "@/components/Shopping-Component/Product-Details";
import { addToCart, fetchTheCartItems } from "@/store/Shopping/Cart-Slice";
import { toast } from "sonner";
import { toGetTheFeatures } from "@/store/Common-Feature-Slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
  { id: "electronics", label: "Electronics", icon: Zap },
];

const BrandsWithIcon = [
  { id: "nike", label: "Nike", icon: nikeIcon },
  { id: "adidas", label: "Adidas", icon: adidasIcon },
  { id: "puma", label: "Puma", icon: pumaIcon },
  { id: "levi", label: "Levi's", icon: levisIcon },
  { id: "zara", label: "Zara", icon: zaraIcon },
  { id: "h&m", label: "H&M", icon: hmIcon },
  { id: "jbl", label: "JBL", icon: jblIcon },
  { id: "hp", label: "HP", icon: hpIcon },
];

export const ShoppingHomePage = () => {

  // to get all the slides 
  const [currentSlides, setCurrentSlides] = useState(0);
  const {shopProductList,productDetails} = useSelector((state)=> state.shopSlice)
  const {user} = useSelector((state)=>state.authenticationSlice)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const {featureImages}  = useSelector((state)=> state.features) 
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useEffect to render the slides on the screen
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlides((prevSlide) => (prevSlide + 1) % featureImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImages]);

  useEffect(()=>{
    dispatch(getFilteredProducts({filterParams: {},sortParams: ''}))

  },[dispatch])

  useEffect(()=>{

    if(productDetails !== null){
      setOpenDetailsDialog(true)
    }
  },[productDetails])



  // to get the details of the products... 
  function getTheDetails(getTheId){
    dispatch(getTheProductsDetails(getTheId))
  }


  

  function handleNavigateItem(getCurrentItem, section){
    // it will remove the previous filter
    sessionStorage.removeItem('filters')
    // get the section and get the current item
    const currFilter = {
      [section] : [getCurrentItem.id],
    }
    // set the new filter 
    sessionStorage.setItem("filters",JSON.stringify(currFilter))
    // now navigate to the shopping listing
    navigate('/shopping/listing')

  }


  function handleAddToCart(getItemId){
    dispatch(addToCart({userId:user?.id, productId: getItemId, quantity:1})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchTheCartItems(user?.id))
        toast('Product Added to the the cart',{
          style:{
            backgroundColor: 'green',
            borderRadius: '20px'
          }
        })
      }
    })
  }

    useEffect(()=>{
      dispatch(toGetTheFeatures())
    },[dispatch])

  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[700px]  overflow-hidden">
        { featureImages && featureImages.length > 0 ? 
        featureImages.map((slides, index) => (
          <img
            src={slides?.image}
            key={index}
            className={`${
              index === currentSlides ? "opacity-100" : "hidden"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        )) 
        : null
      }
        <Button
          onClick={() =>
            setCurrentSlides(
              (prevSlide) => (prevSlide - 1 + featureImages.length) % featureImages.length
            )
          }
          className="absolute top-1/2 left-5 transform -translate-y-1  cursor-pointer "
          variant="outline"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          className="absolute top-1/2 right-5 cursor-pointer transform -translate-y-1 "
          variant="outline"
          onClick={() =>
            setCurrentSlides((nextSlide) => (nextSlide + 1) % featureImages.length)
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      {/* product by category */}
      <section className="mx-4 mb-2 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl mb-8 font-bold text-center">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 px-4 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
          {categoriesWithIcon.map((categoryItem) => (
            <Card onClick={()=> handleNavigateItem(categoryItem,'category')} className="border-2 border-gray-500 cursor-pointer hover:shadow-lg transition-shadow rounded-4xl">
              <CardContent className="flex flex-col items-center justify-center gap-2">
                <categoryItem.icon className="h-20 w-12 text-blue-500" />
                <span className="font-bold">{categoryItem.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* prodcut by brand */}
        <section className="mx-4 mb-2 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-bold text-2xl mb-10">
              Shop by Brand
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {BrandsWithIcon.map((brandItems) => (
              <Card onClick={()=>handleNavigateItem(brandItems,'brand')} className=" border-2 px-4">
                <CardContent className="flex  items-center flex-col justify-center p-6">
                  <img src={brandItems.icon} />
                  <span className="font-bold">{brandItems.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
      </section>

    <section className="py-12  bg-gray-50" >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shopProductList && shopProductList.length > 0
              ? shopProductList.map((productItems) => (
                  <ShoppingProductTile
                    products={productItems}
                    toHandleDetails={getTheDetails}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productsDetails={productDetails} />

    </div>
  );
};
