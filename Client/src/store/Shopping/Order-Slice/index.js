
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState  = {
    approvalUrl: null, 
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null,
}

export const createNewOrder = createAsyncThunk('/orders/createNewOrder',
    async (orderData) => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/shopping/orders/create`,orderData)
        return result.data
    }
)


export const capturingThePayment = createAsyncThunk('/orders/capturingThePayment',
    async({paymentId,payerId, orderId}) =>{
        const result  = await axios.post(`${import.meta.env.VITE_API_URL}/api/shopping/orders/capture`,{
            paymentId,payerId, orderId
        })
        return result.data
    }
)



export const toGetAllTheOrders = createAsyncThunk('/orders/toGetAllTheOrders',
    async(userId) =>{
        const result  = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopping/orders/list/${userId}`)
        return result.data
    }
)



export const toGetTheOrdersDetails = createAsyncThunk('/orders/toGetTheOrdersDetails',
    async(id) =>{
        const result  = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopping/orders/details/${id}`)
        return result.data
    }
)

export const toDeleteTheOrder = createAsyncThunk('/orders/toDeleteTheOrder',
    async(id) =>{
        const result  = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shopping/orders/delete/${id}`)
        return result.data
    }
)






const shoppingOrderSlice = createSlice({
    name: 'shopOrderSlice',
    initialState,
    reducers: {
        setOrderDetails: (state) => {
                state.orderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createNewOrder.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.approvalUrl = action.payload.approvalUrl
            state.orderId = action.payload.orderId
            sessionStorage.setItem('currentOrderId',JSON.stringify(action.payload.orderId))
            
        })
        .addCase(createNewOrder.rejected,(state)=>{
            state.isLoading = false,
            state.approvalUrl = null,
            state.orderId = null
        })
       .addCase(toGetAllTheOrders.pending,(state)=>{
        state.isLoading = true
       })
       .addCase(toGetAllTheOrders.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.orderList = action.payload.data
       })
       .addCase(toGetAllTheOrders.rejected,(state)=>{
        state.isLoading = false,
        state.orderList = []
       })
       .addCase(toGetTheOrdersDetails.pending,(state)=>{
        state.isLoading = true
       })
       .addCase(toGetTheOrdersDetails.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.orderDetails = action.payload.data
       })
       .addCase(toGetTheOrdersDetails.rejected,(state)=>{
        state.isLoading = false,
        state.orderDetails = null
       })
       .addCase(toDeleteTheOrder.pending,(state)=>{
        state.isLoading = true
       })
       .addCase(toDeleteTheOrder.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.orderList = state.orderList.filter((order)=> order._id !== action.meta.arg) 
       })
       .addCase(toDeleteTheOrder.rejected,(state)=>{
        state.isLoading = false,
        state.orderList = []
       })

       
       
    }
})


export const {setOrderDetails} = shoppingOrderSlice.actions

export default shoppingOrderSlice.reducer