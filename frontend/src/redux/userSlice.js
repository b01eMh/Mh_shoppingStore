import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {
    // action
    setUser: (state, action) => {
      // action.payload = arg from setUser action
      console.log(action.payload);
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions; // 1 radimo export setUser is naseg Slica
export default userSlice.reducer; // 2 export naseg reducer-a
