import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading : true,
    adminProductList: [],

}

export const addProduct = createAsyncThunk('/products/addProduct',
    async(formData) => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`,formData,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
    return result.data

    }
)

export const getProducts = createAsyncThunk('/products/getProducts',
    async() =>{
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`)
        return result.data
    }
    
    
)

export const editProduct = createAsyncThunk('/products/editProduct',
    async({id,formData}) => {
        const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
            formData,
             {
            headers: {
               "Content-Type": "application/json",
            }
        })
        return result.data
    }
)


export const deleteProducts = createAsyncThunk('/products/deleteProducts',
    async(id) => {
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`)
        return result.data
    }
    
)


const AdminProductSlice = createSlice({
  name: "adminProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log(action.payload, "actionPayload");
        (state.isLoading = false), (state.adminProductList = action.payload.data);
      })
      .addCase(getProducts.rejected, (state) => {
        (state.isLoading = false), (state.adminProductList = []);
      });
  },
});


export default AdminProductSlice.reducer 