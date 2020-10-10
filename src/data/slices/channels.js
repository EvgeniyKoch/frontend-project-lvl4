/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channel',
  initialState: { channels: [], currentChannelId: null },
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    renameChannel: (state, { payload: { id, name } }) => {
      const channel = state.channels.find((c) => c.id === id);
      channel.name = name;
    },
    removeChannel: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((c) => c.id !== id);
    },
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = channelSlice;
export default channelSlice.reducer;
