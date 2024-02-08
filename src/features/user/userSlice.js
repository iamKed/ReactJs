import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User_Details",
  initialState: {
    loading: false,
    user: {},
    userTodos: [],
    error: "Please Login to use the Application",
  },
  reducers: {
    setUserRedux: (state, action) => {
      state.user = action.payload;
    },
    seterror: (state, action) => {
      state.error = action.payload;
    },
    setTodos: (state, action) => {
      state.todos.push(action.payload);
    },
  },
});
export const { setUserRedux, seterror } = userSlice.actions;
// console.log(state.user.user)
export default userSlice.reducer;
