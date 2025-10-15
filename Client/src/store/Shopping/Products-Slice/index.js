import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    shopProductList: [],
    productDetails: null
}


export const getFilteredProducts = createAsyncThunk('/products/getFilteredProducts',
    async({filterParams,sortParams}) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        })
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopping/products/get?${query}`)
        return result.data
    }
    
)

export const getTheProductsDetails = createAsyncThunk('/products/getTheProductsDetails',
    async(id) => {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopping/products/get/${id}`)
        return result.data
    }

)

const shopProductSlice = createSlice({
    name: 'shoppingProductSlice',
    initialState,
    reducers:{
        setProductDetails : (state) =>{
            state.productDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFilteredProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getFilteredProducts.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.shopProductList = action.payload.data
        })
        .addCase(getFilteredProducts.rejected,(state)=>{
            state.isLoading = false,
            state.shopProductList = []
        })
        .addCase(getTheProductsDetails.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getTheProductsDetails.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.productDetails = action.payload.data
        })
        .addCase(getTheProductsDetails.rejected,(state)=>{
            state.isLoading = false,
            state.productDetails = null
        })
    }

})

export const {setProductDetails} = shopProductSlice.actions
export default  shopProductSlice.reducer