import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //Login
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    //Logout
    unsetUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
