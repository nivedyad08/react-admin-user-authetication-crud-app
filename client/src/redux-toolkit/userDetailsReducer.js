import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: { data: "" },
};
const userSlice = createSlice({
  name: "userData",
  initialState: initialState,

  reducers: {
    setUserDetailsSlice: (state, action) => {
      state.userInfo.data = action.payload;
    },
  },
  extraReducers: {},
});

export const { setUserDetailsSlice } = userSlice.actions;
export default userSlice.reducer;
