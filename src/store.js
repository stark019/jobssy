import { configureStore } from '@reduxjs/toolkit';
import userReducer from './useSlice'

const store = configureStore({
  reducer: {
    users: userReducer
  }
})
export default store;