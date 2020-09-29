import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: null,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      const channel = state.channels.find((c) => c.id === id);
      channel.name = name;
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      state.messages = state.messages.filter((m) => m.channelId !== id);
      state.channels = state.channels.filter((c) => c.id !== id);
    },
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    openModal: (state, { payload }) => {
      state.modal.isOpen = true;
      state.modal.type = payload.type;
      state.modal.extra = payload.data;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.extra = null;
    },
    showToast: (state, { payload }) => {
      state.toast.isOpen = payload;
    },
  },
  extraReducers: {},
});

export const { actions } = chatSlice;
export default chatSlice.reducer;
