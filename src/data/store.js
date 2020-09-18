import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

export default configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});