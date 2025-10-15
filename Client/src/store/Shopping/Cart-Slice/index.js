import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState  = {
    cartItems: [],
    isLoading: false,

}



export const addToCart = createAsyncThunk('/cart/addToCart',
    async({userId,productId,quantity}) => {
        const result = await  axios.post(`${import.meta.env.VITE_API_URL}/api/shopping/cart/add`,{
            userId,productId,quantity
        })
        return result.data
    }
)
export const fetchTheCartItems = createAsyncThunk('/cart/fetchTheCartItems',
    async(userId) => {
        const result = await  axios.get(`${import.meta.env.VITE_API_URL}/api/shopping/cart/get/${userId}`)
        return result.data
    }
)
export const toUpdateTheCart = createAsyncThunk('/cart/toUpdateTheCart',
    async({userId,productId,quantity}) => {
        const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/shopping/cart/update`,{
            userId,productId,quantity
        })
        return result.data
    }
)
export const deleteItemsFromCart = createAsyncThunk('/cart/deleteItemsFromCart',
    async({userId,productId}) => {
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shopping/cart/delete/${userId}/${productId}`)
        return result.data
    }
)


const ShoppingCartSlice = createSlice({
    name: 'shoppingCartSlice',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(addToCart.rejected,(state)=>{
            state.isLoading = false,
            state.cartItems = []
        })
        .addCase(fetchTheCartItems.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(fetchTheCartItems.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(fetchTheCartItems.rejected,(state)=>{
            state.isLoading = false,
            state.cartItems = []
        })
        .addCase(toUpdateTheCart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(toUpdateTheCart.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(toUpdateTheCart.rejected,(state)=>{
            state.isLoading = false,
            state.cartItems = []
        })
        .addCase(deleteItemsFromCart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteItemsFromCart.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(deleteItemsFromCart.rejected,(state)=>{
            state.isLoading = false,
            state.cartItems = []
        })
    }
})


export default ShoppingCartSlice.reducer