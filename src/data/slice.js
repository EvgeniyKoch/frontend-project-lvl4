import { createSlice } from '@reduxjs/toolkit';

import { addChannel, changeChannelName, deleteChannel } from './actions';
import { CREATE_CHANNEL, RENAME_CHANNEL, REMOVE_CHANNEL } from './constants';

const chatSlice = createSlice({
  name: 'chat',
  initialState: null,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    createChannels: (state) => {
      state.modal.isOpen = true;
      state.modal.type = CREATE_CHANNEL;
    },
    renameChannel: (state, { payload }) => {
      state.modal.isOpen = true;
      state.modal.type = RENAME_CHANNEL;
      state.modal.extra = payload;
    },
    removeChannel: (state, { payload }) => {
      state.modal.isOpen = true;
      state.modal.type = REMOVE_CHANNEL;
      state.modal.extra = payload;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.extra = null;
    },
  },
  extraReducers: {
    [addChannel.fulfilled]: (state, { payload }) => {
      state.channels.push(payload);
    },
    [changeChannelName.fulfilled]: (state, { payload }) => {
      const { id, name } = payload;
      const channel = state.channels.find((c) => c.id === id);
      channel.name = name;
    },
    [deleteChannel.fulfilled]: (state, { payload }) => {

    },
  },
});

export const { actions } = chatSlice;
export default chatSlice.reducer;
