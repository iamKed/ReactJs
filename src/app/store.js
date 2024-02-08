import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../features/user/userSlice";
const store = configureStore({
  reducer: {
    userDetails: userSliceReducer,
  },
});
export default store;
