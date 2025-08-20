import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to create a checkout session
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Checkout failed" });
    }
  }
);

// ✅ Async thunk to fetch checkout by ID
export const fetchCheckoutById = createAsyncThunk(
  "checkout/fetchCheckoutById",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch checkout" });
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {
    // You can add resetCheckout later if needed
    // resetCheckout: (state) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.checkout = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 createCheckout cases
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // 🔹 fetchCheckoutById cases
      .addCase(fetchCheckoutById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckoutById.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(fetchCheckoutById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default checkoutSlice.reducer;
