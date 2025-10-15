import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {

    isLoading: false,
    featureImages: [],

}






export const toAddTheFeatures = createAsyncThunk('',
    async(image) =>{
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/common/features/add-image`,{image})
        return result.data
    }
)

export const toGetTheFeatures = createAsyncThunk('',
    async() =>{
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/common/features/get-image`)
        return result.data
    }
)











const FeaturesSlice = createSlice({
    name:'ProductFeaturesSlice',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(toGetTheFeatures.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(toGetTheFeatures.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.featureImages = action.payload.data
        })
        .addCase(toGetTheFeatures.rejected,(state)=>{
            state.isLoading = false,
            state.featureImages = []
        })
    }
})


export default FeaturesSlice.reducer