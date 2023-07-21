import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import donationReducer from "../features/donation/donationSlice";
import createDonationReducer from "../features/donation/createDonationSlice";
import updateDonationReducer from "../features/donation/updateDonation";
import cancelRemoveDonationReducer from "../features/donation/cancelRemoveDonationSlice";
import userlistReducer from "../features/users/userlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    donation: donationReducer,
    createDonation: createDonationReducer,
    updateDonation: updateDonationReducer,
    cancelRemoveDonation: cancelRemoveDonationReducer,
    userlist: userlistReducer,
  },
});

export const getState = store.getState;
export const dispatch = store.dispatch;
