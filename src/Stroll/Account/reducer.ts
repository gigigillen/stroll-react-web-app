import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

//keeping track of the current user
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
