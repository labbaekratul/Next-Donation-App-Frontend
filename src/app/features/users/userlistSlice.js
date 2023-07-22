// productsSlice.js

import { getTokenFromLocalStorage } from "@/app/helpers/mixin";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../auth/authSlice";

// Helper function to get the token from local storage

const initialState = {
  loading: false,
  users: [],
  error: null,
};

// Create an async thunk action to fetch all users
export const UsersList = createAsyncThunk(
  "users/list",
  async (query, { rejectWithValue }) => {
    const pageNumber = query ? query : 1;
    try {
      const { token } = getTokenFromLocalStorage("userInfo");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get(
        `${API}/user?pageNumber=${pageNumber}&include=donation&includeFields=status,donationAmount`,
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

const userlistSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UsersList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(UsersList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    });
    builder.addCase(UsersList.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default userlistSlice.reducer;
