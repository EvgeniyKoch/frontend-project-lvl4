import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

export const addMessage = createAction('message/add');

export const sendMessage = createAsyncThunk(
  'message/send',
  async (payload) => {
    await axios.post(routes.channelMessagesPath(payload.data.attributes.channelId), payload);
  },
);
