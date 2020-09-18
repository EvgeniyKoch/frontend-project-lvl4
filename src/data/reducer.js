import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
  messages: '',
};

export default createReducer(initialState, {});
