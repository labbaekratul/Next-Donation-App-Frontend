import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../auth/authSlice";
import { getTokenFromLocalStorage } from "@/app/helpers/mixin";

const initialState = {
  loading: false,
  success: false,
  updatedData: null,
  error: null,
};

// Create an async thunk action to update a user's information
export const updateUserByAdmin = createAsyncThunk(
  "user/update",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const { token } = getTokenFromLocalStorage("userInfo");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.put(
        `${API}/user/admin/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserByAdmin.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(updateUserByAdmin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.updatedData = payload;
    });
    builder.addCase(updateUserByAdmin.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export default updateUserSlice.reducer;
