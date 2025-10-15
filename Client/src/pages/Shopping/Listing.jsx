import { FilterTheProduct } from '@/components/Shopping-Component/Filter'
import { ProductDetails } from '@/components/Shopping-Component/Product-Details'
import { ShoppingProductTile } from '@/components/Shopping-Component/Product-tile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sorting } from '@/config/Config'
import { addToCart, fetchTheCartItems } from '@/store/Shopping/Cart-Slice'
import { getFilteredProducts, getTheProductsDetails } from '@/store/Shopping/Products-Slice'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'


function createSearchParamsHelper(filterParams){
  const queryParams = [];

  for(const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length > 0){
      const paramValue = value.join(',')
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`) // encode the url 
    }
  }
  return queryParams.join('&') 

}


export const ShoppingListingPage = () => {
  const dispatch  = useDispatch()
  const {shopProductList, productDetails} = useSelector((state)=>state.shopSlice)
  const [filters,setFilters] = useState({}) 
  const [sort, setSort] = useState(null)
  const [searchParams,setSearchParams] = useSearchParams()  
  const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
  const {user} = useSelector((state)=>state.authenticationSlice)
  const {cartItems}  = useSelector((state)=>state.cartSlice)
  
  const categorySearchParams = searchParams.get('category')

  // on page load get the filtered products
  useEffect(()=>{
    if(filters !== null && sort !== null){
      dispatch(getFilteredProducts({filterParams:filters, sortParams: sort}))
    }
  },[dispatch,sort,filters])
  
  // on pageload set the filters and sorting
  useEffect(()=>{
    setSort('price-lowToHigh')// set the default sort option
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {}) //  

  },[categorySearchParams])


  useEffect(()=>{
    if(filters && Object.keys(filters).length > 0 ){
      const createQueryString = createSearchParamsHelper(filters) // will generate and manage the url query string
      setSearchParams(new URLSearchParams(createQueryString)) // modify the urlquerystring and manage it
    }
  },[filters])

  useEffect(()=>{
    if(productDetails !== null){
      setOpenDetailsDialog(true)
    }
  },[productDetails])

  console.log(shopProductList, 'Shopping Product List')
  
  // to handle the sort value
  function handleSort(value){
    console.log(value, 'sort value');
    setSort(value)
  }


  // function toHandleTheCartItems 
  function handleAddToCart(getCartItemsId,getTheTotalStock){
    
    let getCartItems = cartItems.items || []

    if(getCartItems.length){
      const indexOfCurrentItem = getCartItems.findIndex((item)=> item.productId === getCartItemsId)
      if(indexOfCurrentItem > -1){
        const getCurrentQuantity = getCartItems[indexOfCurrentItem].quantity
        if(getCurrentQuantity + 1 > getTheTotalStock){
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



    dispatch(addToCart({userId: user?.id, productId:getCartItemsId, quantity: 1})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchTheCartItems(user?.id))
        toast('Item added into cart',{
          style:{
           backgroundColor:'green',
            color: 'white',
            border: 'none',
            borderRadius: '20px'
          }
        })
      }
    })

      
  }

  

  // to handle the filter value
  function toHandleTheFilter(sectionId,currentOption) {
    console.log(filters,'filters');

    

    /*****  logic for filtering the products *****/

    // first copy the filter in a variable using filters state
    let copyTheFilters = {...filters};
    
    // now get the index of current section(category or brand)
    const indexOfCurrentSection = Object.keys(copyTheFilters).indexOf(sectionId)
    // if the index of current section is -1 then there is no filter is added for the current section
    if(indexOfCurrentSection === -1 ){ 
      copyTheFilters = {
        ...copyTheFilters, 
        [sectionId]: [currentOption]   
      }
      
      console.log(indexOfCurrentSection,'indexOfCurrentSection');
    }
    else{
      // will check if the option is added or not
      const indexOfCurrentOption  =  copyTheFilters[sectionId].indexOf(currentOption)

      if(indexOfCurrentOption === -1){
        copyTheFilters[sectionId].push(currentOption) // push the option in the section
      }
      else{
        copyTheFilters[sectionId].splice(indexOfCurrentOption, 1) // remove the option from the section
      }
    }


    setFilters(copyTheFilters) 
    // set the filters in session storage 
    sessionStorage.setItem('filters',JSON.stringify(copyTheFilters))
    
    
  }


  // to get the product details
  function toHandleDetails( getCurrentId){

    dispatch(getTheProductsDetails(getCurrentId))
  }

  
  
  
  return (
    <div className='grid grid-cols-1  md:grid-cols-[250px_1fr] p-4 mt-12'>
      {/* filter component */}
      <FilterTheProduct filters={filters} toHandleTheFilter={toHandleTheFilter} />
      {/* above section of listing page */}
      <div className='w-full rounded-lg shadow-sm mt-2'>
        <div className='p-4 border-b flex items-center text-lg font-bold justify-between'>
          <h2>All Products</h2>
          <div className='flex items-center gap-2'>
            <span>{shopProductList?.length}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm"  className="flex  items-center">
                <ArrowUpDown className='h-4 w-4'/>
                <span>Sort By</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50" align="end">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {
                  sorting.map((sortItems)=> 
                    <DropdownMenuRadioItem value={sortItems.id} key={sortItems.id}>
                      {
                        sortItems.label
                      }
                    </DropdownMenuRadioItem>
                  )
                }
              </DropdownMenuRadioGroup>

            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>


        {/* Rendering the shopping products section  */}
        <div className='grid grid-cols-1  gap-5 sm:grid-cols-1 mx-15 items-stretch my-5 sm:py-5 sm:mx-30  md:grid-cols-2 md:mx-5 lg:grid-cols-4'>
          {
            shopProductList && shopProductList.length > 0 ?
            shopProductList.map((productItems)=>
              <ShoppingProductTile toHandleDetails={toHandleDetails} handleAddToCart={handleAddToCart} products={productItems} />
          ) : null
        }
        </div>
      </div>

        <ProductDetails productsDetails={productDetails} open={openDetailsDialog} setOpen={setOpenDetailsDialog} />
    </div>
  )
}
