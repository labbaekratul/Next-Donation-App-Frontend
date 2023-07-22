import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import donationReducer from "../features/donation/donationSlice";
import createDonationReducer from "../features/donation/createDonationSlice";
import updateDonationReducer from "../features/donation/updateDonation";
import cancelRemoveDonationReducer from "../features/donation/cancelRemoveDonationSlice";
import userlistReducer from "../features/users/userlistSlice";
import deleteDonationReducer from "../features/donation/deleteDonation";
import updateUserSliceByAdminReducer from "../features/users/updateUserSlice";
import deleteUserReducer from "../features/users/deleteUserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    donation: donationReducer,
    createDonation: createDonationReducer,
    updateDonation: updateDonationReducer,
    cancelRemoveDonation: cancelRemoveDonationReducer,
    userlist: userlistReducer,
    deleteDonation: deleteDonationReducer,
    updateUserByAdmin: updateUserSliceByAdminReducer,
    deleteUser: deleteUserReducer,
  },
});

export const getState = store.getState;
export const dispatch = store.dispatch;
