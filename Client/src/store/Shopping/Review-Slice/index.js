import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




const initialState = {
    isLoading: false,
    reviews: []
}

export const toAddReviews = createAsyncThunk('/order/toAddReviews',
    async(formData) => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/shopping/review/addReview`, formData)
        return result.data
    }
) 
export const toGetTheReivews = createAsyncThunk('/order/toGetTheReivews',
    async(id) => {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopping/review/${id}`)
        return result.data
    }
) 



const ProductReviewsSlice = createSlice({
    name: 'ReviewSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(toGetTheReivews.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(toGetTheReivews.fulfilled,(state,action)=>{
            state.isLoading = false
            state.reviews = action.payload.data
        })
        builder.addCase(toGetTheReivews.rejected,(state)=>{
            state.isLoading = false
            state.reviews = []
        })
    }
})


export default  ProductReviewsSlice.reducer 


