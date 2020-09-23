import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

// const addMessage = createAction('ADD_MESSAGE');

const sendMessage = createAsyncThunk(
  'message/add',
  async (payload) => {
    const response = await axios.post(routes.channelMessagesPath(payload.currentChannelId), payload);
    return response.data;
  },
);

export default sendMessage;
