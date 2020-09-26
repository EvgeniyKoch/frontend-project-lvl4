import { createSlice } from '@reduxjs/toolkit';
import { addMessage } from './actions';

const messageSlice = createSlice({
  name: 'message',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMessage, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default messageSlice.reducer;
