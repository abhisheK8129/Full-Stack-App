import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

// create the initila state for default purpose
const initialState = {
  isUserAuthenticated: false,
  isPageLoading: true,
  user: null,
};

// create the register api
export const toRegisterTheUser = createAsyncThunk(
  "/auth/register",

  // now create the api call
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      formData,
      { withCredentials: true }
    );
    return result.data;
  }
);

export const toLoginTheUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      formData,
      { withCredentials: true }
    );
    return result.data;
  }
);

export const logoutTheUser = createAsyncThunk(
  "/auth/logoutTheUser",
  async () => {
    try{
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      return result.data;
    }
    catch(err){
      toast('you are not connected to the database',err)

    }
    }
);

export const checkTheAuthentication = createAsyncThunk(
  "/auth/checkTheAuthentication",
  async () => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Expires: "0",
      },
    });
    return result.data;
  }
);

// this is the authSlice
const authSlice = createSlice({
  name: "authenticationSlice",
  initialState,
  reducers: {},

  // create the extraReducer to do the needful action according to the state of the api
  extraReducers: (builder) => {
    // when the register user api is pending
    builder
      .addCase(toRegisterTheUser.pending, (state) => {
        state.isPageLoading = true;
      })

      // when the register user api is fulfilled
      .addCase(toRegisterTheUser.fulfilled, (state, action) => {
        (state.isPageLoading = false), (state.isUserAuthenticated = false);
        state.user = null;
      })

      .addCase(toRegisterTheUser.rejected, (state, action) => {
        (state.isPageLoading = false),
          (state.isUserAuthenticated = false),
          (state.user = null);
      })
      .addCase(toLoginTheUser.pending, (state) => {
        state.isPageLoading = true;
      })
      .addCase(toLoginTheUser.fulfilled, (state, action) => {
        console.log(action); // log the action
        (state.isPageLoading = false),
          (state.user = action.payload.success ? action.payload.user : null),
          (state.isUserAuthenticated = action.payload.success);
      })
      .addCase(toLoginTheUser.rejected, (state, action) => {
        (state.isPageLoading = false),
          (state.isUserAuthenticated = false),
          (state.user = null);
      })
      .addCase(checkTheAuthentication.pending, (state) => {
        state.isPageLoading = true;
      })
      .addCase(checkTheAuthentication.fulfilled, (state, action) => {
        (state.isPageLoading = false),
          (state.user = action.payload.success ? action.payload.user : null),
          (state.isUserAuthenticated = action.payload.success);
      })
      .addCase(checkTheAuthentication.rejected, (state, action) => {
        (state.isPageLoading = false),
          (state.isUserAuthenticated = false),
          (state.user = null);
      })
      .addCase(logoutTheUser.fulfilled, (state, action) => {
        (state.isPageLoading = false), (state.isUserAuthenticated = false);
        state.user = null;
      });
  },
});

export default authSlice.reducer;
