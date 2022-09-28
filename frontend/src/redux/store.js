import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import userReducer from './userSlice';

// store definition (state)
export default configureStore({
  reducer: {
    userStore: userReducer,
    cartStore: cartSlice,
  },
});

// must wrapper our app with Provider tag with props from store.js
