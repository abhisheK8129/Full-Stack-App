import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    addressList: []
}


export const toAddTheAddress = createAsyncThunk("/addresses/toAddTheAddress",
    async(formData) => {
        const result  = await axios.post(`${import.meta.env.VITE_API_URL}/api/shopping/address/add`,formData)
        return result.data
    }
)

export const toFetchTheAddress = createAsyncThunk("/addresses/toFetchTheAddress",
    async(userId) => {
        const result  = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopping/address/get/${userId}`)
        return result?.data
    }
)

export const toEditTheAddress = createAsyncThunk("/addresses/toEditTheAddress",    
    async({userId,addressId,formData}) => {
        const result  = await axios.put(`${import.meta.env.VITE_API_URL}/api/shopping/address/update/${userId}/${addressId}`,formData)
        return result?.data
    }
)
export const toDeleteTheAddress = createAsyncThunk("/addresses/toDeleteTheAddress",
    async({userId,addressId}) => {
        const result  = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shopping/address/delete/${userId}/${addressId}`)
        return result?.data
    }
)





const AddressSlice = createSlice({
    name:'address',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(toAddTheAddress.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(toAddTheAddress.fulfilled,(state,action)=>{
            state.isLoading  = false
        })
        .addCase(toAddTheAddress.rejected,(state)=>{
            state.isLoading = false
        })
        .addCase(toFetchTheAddress.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(toFetchTheAddress.fulfilled,(state,action)=>{
            state.isLoading  = false,
            state.addressList = action.payload.data
        })
        .addCase(toFetchTheAddress.rejected,(state)=>{
            state.isLoading = false,
            state.addressList = []
        })
    }
})


export default AddressSlice.reducer