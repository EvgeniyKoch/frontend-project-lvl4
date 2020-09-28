import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

export const sendMessage = createAsyncThunk(
  'chat/message/send',
  async (payload) => {
    await axios.post(routes.channelMessagesPath(payload.data.attributes.channelId), payload);
  },
);

export const addChannel = createAsyncThunk(
  'chat/channel/createChannel',
  async (payload) => {
    const response = await axios.post(routes.channelsPath(), payload);
    return response.data.data.attributes;
  },
);

export const changeChannelName = createAsyncThunk(
  'chat/channel/changeNameChannel',
  async (payload) => {
    const response = await axios.patch(routes.channelPath(payload.data.attributes.channelId), payload);
    return response.data.data.attributes;
  },
);

export const deleteChannel = createAsyncThunk(
  'chat/channel/deleteChannel',
  async (payload) => {
    await axios.delete(routes.channelPath(payload.data.attributes.channelId), payload);
  },
);
