// productsSlice.js

import { getTokenFromLocalStorage } from "@/app/helpers/mixin";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../auth/authSlice";

// Helper function to get the token from local storage

const initialState = {
  loading: false,
  donations: [],
  error: null,
};

// Create an async thunk action to fetch all donations
export const fetchAllDonations = createAsyncThunk(
  "donations/fetchAll",
  async (query, { rejectWithValue }) => {
    const pageNumber = query ? query : 1;
    try {
      const { token } = getTokenFromLocalStorage("userInfo");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get(
        `${API}/donation?pageNumber=${pageNumber}&include=user&includeFields=name`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const donationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllDonations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllDonations.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.donations = payload;
    });
    builder.addCase(fetchAllDonations.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default donationSlice.reducer;
