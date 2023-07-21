import { getTokenFromLocalStorage } from "@/app/helpers/mixin";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../auth/authSlice";

const initialState = {
  loading: false,
  error: null,
  donation: {},
};

// Create an async thunk action to create a new donation
export const createNewDonation = createAsyncThunk(
  "donations/create",
  async (donationData, { rejectWithValue }) => {
    try {
      const { token } = getTokenFromLocalStorage("userInfo");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(`{${API}/api/donation`, donationData, {
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

const createDonationSlice = createSlice({
  name: "createDonation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewDonation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNewDonation.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.donation = payload;
    });
    builder.addCase(createNewDonation.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default createDonationSlice.reducer;
