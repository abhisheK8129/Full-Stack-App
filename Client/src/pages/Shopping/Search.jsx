import { ProductDetails } from '@/components/Shopping-Component/Product-Details'
import { ShoppingProductTile } from '@/components/Shopping-Component/Product-tile'
import { Input } from '@/components/ui/input'
import { addToCart, fetchTheCartItems } from '@/store/Shopping/Cart-Slice'
import { toGetAllTheOrders, toGetTheOrdersDetails } from '@/store/Shopping/Order-Slice'
import { getTheProductsDetails } from '@/store/Shopping/Products-Slice'
import { resetSearch, searchProducts } from '@/store/Shopping/Search-Slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const SearchAboutTheProducts = () => {
    const dispatch = useDispatch()
    const [keyword,setKeyword] = useState('')
    const [searchParams,setSearchParams] = useSearchParams()
    const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
    const {searchResults} = useSelector((state)=>state.searchSlice)
    const {user} = useSelector((state)=>state.authenticationSlice)
    const {shopProductList, productDetails} = useSelector((state)=> state.shopSlice)
    const {cartItems} = useSelector((state)=>state.cartSlice)
    

    useEffect(()=>{
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3){
            setTimeout(()=>{
                setSearchParams(new URLSearchParams(`?YourKeyword=${keyword}`))
                dispatch(searchProducts(keyword))
            },500)
        }
        else{
            dispatch(resetSearch())
            setSearchParams(new URLSearchParams(`?YourKeyword=${keyword}`))
        }
    },[keyword])

    useEffect(()=>{
        if(productDetails !== null){
            setOpenDetailsDialog(true)
        }
    },[productDetails])

    console.log(searchResults,'searchResults')


    function AddToCart(getTheItemId, getTheTotalStock){
        let getTheOriginalCart = cartItems.items || []
        if(getTheOriginalCart.length){
            const indexOfCurrentCartItems = getTheOriginalCart.findIndex((item)=>item.productId === getTheItemId)
            if(indexOfCurrentCartItems > -1 ){
                const getTheCartQuantity = getTheOriginalCart[indexOfCurrentCartItems].quantity
                if(getTheCartQuantity + 1 > getTheTotalStock){
                 toast(`Only ${getTheTotalStock} items can be added`,{
                            style:{
                              backgroundColor: 'red',
                              color:  'white',
                              borderRadius: '20px',
                              border: 'none'
                            }
                          })
                          return
                }
            }
        }
        dispatch(addToCart({userId: user?.id, productId: getTheItemId, quantity:1})).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchTheCartItems(user?.id))
                toast('Item added to cart')
            }
        })

    }


    function toHandleProductDetails(getTheProductId){
        dispatch(getTheProductsDetails(getTheProductId))
    }

  return (
    <div className='container mx-auto mt-20 py-2 px-5'>
        <div className='flex justify-center items-center  mb-8'>
            <div className='lg:w-full md:w-[800px]  items-center sm:w-[600px] flex'>
                <Input className='py-6 rounded-4xl border-2 border-gray-400' name="keyword" onChange={(event) => setKeyword(event.target.value)} value={keyword} placeholder = 'search...' />
            </div>
        </div>

                {
                    !searchResults.length ? 
                    <h1 className='lg:text-5xl font-bold md:text-3xl sm:text-2xl text-center '>No items found</h1>
                    : null
                }
            <div className='grid lg:grid-cols-4 mx-15 items-stretch  sm:grid-cols-2 md:grid-cols-2 gap-3'>
                {
                    searchResults.map((searchItems)=>
                        <ShoppingProductTile products={searchItems} handleAddToCart={AddToCart} toHandleDetails={toHandleProductDetails} />
                    )
                }
            </div>
            <ProductDetails productsDetails={productDetails} open={openDetailsDialog} setOpen={setOpenDetailsDialog} />
    </div>
  )
}
