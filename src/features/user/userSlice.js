import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User_Details",
  initialState: {
    loading: false,
    user: {},
    error: "Please Login to use the Application",
  },
  reducers: {
    setUserRedux: (state, action) => {
      state.user =  action.payload;
      console.log("This is the setUser method in redux reducers after dispatcher is used",state.user)
    },
    seterror: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setUserRedux, seterror } = userSlice.actions;
// console.log(state.user.user)
export default userSlice.reducer;
