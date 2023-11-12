import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loggedInUser: null,
    authToken: null,
    isLoggedIn: false,
    username: '',
  },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { registerUser, setUsername } = userSlice.actions;
export default userSlice.reducer;
