// deleteDonationSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../auth/authSlice";
import { getTokenFromLocalStorage } from "@/app/helpers/mixin";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

// Create an async thunk action to delete a donation
export const deleteDonation = createAsyncThunk(
  "donations/delete",
  async (donationId, { rejectWithValue }) => {
    try {
      const { token } = getTokenFromLocalStorage("userInfo");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.delete(`${API}/donation/${donationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteDonationSlice = createSlice({
  name: "deleteDonation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteDonation.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(deleteDonation.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(deleteDonation.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export default deleteDonationSlice.reducer;
