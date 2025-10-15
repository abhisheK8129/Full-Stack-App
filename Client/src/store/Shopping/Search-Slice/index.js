import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    searchResults: []
}


export const searchProducts = createAsyncThunk('/search/searchProducts',
    async(keyword) => {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopping/search/${keyword}`)
        return result.data
    }
) 


const SearchSlice = createSlice({
    name: 'SearchProductsSlice',
    initialState,
    reducers:{
        resetSearch: (state) =>{
            state.searchResults = []
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(searchProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(searchProducts.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.searchResults = action.payload.data
        })
        .addCase(searchProducts.rejected,(state)=>{
            state.isLoading = false,
            state.searchResults = []
        })
    }

})



export default SearchSlice.reducer 
export const {resetSearch} =  SearchSlice.actions