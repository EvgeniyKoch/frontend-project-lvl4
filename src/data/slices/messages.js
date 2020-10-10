/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channels';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: (state, { payload: { id } }) => {
      state.messages = state.messages.filter((m) => m.channelId !== id);
    },
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
