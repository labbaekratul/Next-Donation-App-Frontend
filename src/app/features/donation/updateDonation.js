import { getTokenFromLocalStorage } from "@/app/helpers/mixin";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../auth/authSlice";

const initialState = {
  updating: false,
  updatedDonationByUser: null,
  updatedDonationByAdmin: null,
  updateDonation: false,
  cancelOrReove: false,
  cancelOrReoveDonation: null,
  error: null,
};

export const updateDonationByUser = createAsyncThunk(
  "donations/update",
  async ({ donationId, updatedData }, { rejectWithValue }) => {
    try {
      const { token } = getTokenFromLocalStorage("userInfo");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.patch(
        `{${API}}/donation/user/${donationId}`,
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

export const updateDonationByAdmin = createAsyncThunk(
  "donations/adminUpdate",
  async ({ donationId, updatedData }, { rejectWithValue }) => {
    try {
      const { token } = getTokenFromLocalStorage("userInfo");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.put(
        `${API}/donation/${donationId}`,
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

const donationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateDonationByUser.pending, (state) => {
      state.updating = true;
      state.error = null;
    });
    builder.addCase(updateDonationByUser.fulfilled, (state, { payload }) => {
      state.updating = false;
      state.updatedDonationByUser = payload;
    });
    builder.addCase(updateDonationByUser.rejected, (state, { payload }) => {
      state.updating = false;
      state.error = payload;
    });
    builder.addCase(updateDonationByAdmin.pending, (state) => {
      state.updating = true;
      state.error = null;
    });
    builder.addCase(updateDonationByAdmin.fulfilled, (state, { payload }) => {
      state.updating = false;
      state.updatedDonationByAdmin = payload;
    });
    builder.addCase(updateDonationByAdmin.rejected, (state, { payload }) => {
      state.updating = false;
      state.error = payload;
    });
  },
});

export default donationSlice.reducer;
