import { getTokenFromLocalStorage } from "@/app/helpers/mixin";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../auth/authSlice";

const initialState = {
  cancelOrReove: false,
  cancelOrReoveDonation: null,
  error: null,
};

export const cancelRemoveDonationByUser = createAsyncThunk(
  "donations/cancel",
  async ({ donationId, updatedData }, { rejectWithValue }) => {
    try {
      const { token } = getTokenFromLocalStorage("userInfo");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.patch(
        `${API}/donation/soft-delete/${donationId}`,
        updatedData,
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
const cancelRemoveDonationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cancelRemoveDonationByUser.pending, (state) => {
      state.cancelOrReove = true;
      state.error = null;
    });
    builder.addCase(
      cancelRemoveDonationByUser.fulfilled,
      (state, { payload }) => {
        state.cancelOrReove = false;
        state.cancelOrReoveDonation = payload;
      }
    );
    builder.addCase(
      cancelRemoveDonationByUser.rejected,
      (state, { payload }) => {
        state.cancelOrReove = false;
        state.error = payload;
      }
    );
  },
});

export default cancelRemoveDonationSlice.reducer;
