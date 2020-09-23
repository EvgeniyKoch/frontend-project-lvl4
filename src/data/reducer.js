import { createSlice } from '@reduxjs/toolkit';
import sendMessage from './actions';

const messageSlice = createSlice({
  name: 'message',
  initialState: [],
  reducers: {},
  extraReducers: {
    [sendMessage.fulfilled]: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export default messageSlice.reducer;
