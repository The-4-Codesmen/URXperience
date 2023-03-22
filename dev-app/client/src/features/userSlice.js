//redux store to handle user state for message notification
import { createSlice, current } from "@reduxjs/toolkit";
import appApi from "../services/appApi";
export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addNotifications: (state, { payload }) => {
      if (state.user.newMessages[payload]) {
        state.user.newMessages[payload] = state.user.newMessages[payload] + 1;
      } else {
        state.user.newMessages[payload] = 1;
      }
    },
    resetNotifications: (state, { payload }) => {
      delete state.user.newMessages[payload];
    },
  },

  extraReducers: (builder) => {
    // save user after login
    builder.addMatcher(
      appApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => payload
    );
    // logout: destroy user session
    builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
  },
});
export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;
