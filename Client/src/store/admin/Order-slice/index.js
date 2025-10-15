import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const toGetAllTheAdminOrders = createAsyncThunk(
  "/orders/toGetAllTheAdminOrders",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/get`
    );
    return result.data;
  }
);

export const toGetTheAdminOrdersDetails = createAsyncThunk(
  "/orders/toGetTheAdminOrdersDetails",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`
    );
    return result.data;
  }
);

export const updateTheOrderStatus = createAsyncThunk('/orders/updateTheOrderStatus',
  async({id,orderStatus}) =>{
    const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,{
      orderStatus,
    })
    return result.data
  }
)

export const toDeleteTheOrder = createAsyncThunk(
  "/orders/toDeleteTheOrder",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/delete/${id}`
    );
    return result.data;
  }
);


const adminOrderSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toGetAllTheAdminOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toGetAllTheAdminOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(toGetAllTheAdminOrders.rejected, (state) => {
        state.isLoading = false;
         state.orderList = [];
      })
      .addCase(toGetTheAdminOrdersDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toGetTheAdminOrdersDetails.fulfilled, (state, action) => {
        state.isLoading = false;
         state.orderDetails = action.payload.data;
      })
      .addCase(toGetTheAdminOrdersDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(toDeleteTheOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toDeleteTheOrder.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.orderList = state.orderList.filter(
            (order) => order._id !== action.meta.arg
          ));
      })
      .addCase(toDeleteTheOrder.rejected, (state) => {
        (state.isLoading = false), (state.orderList = []);
      });
  },
});

export const { setOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
