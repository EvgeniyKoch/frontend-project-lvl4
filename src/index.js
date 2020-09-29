import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import gon from 'gon';
import Rollbar from 'rollbar';

import reducer from './data/slice';

import '../assets/application.scss';

import renderChats from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const preloadedState = {
  channels: gon.channels,
  currentChannelId: gon.currentChannelId,
  messages: gon.messages,
  modal: {
    isOpen: false,
    type: null,
    extra: null,
  },
  toast: {
    isOpen: false,
  },
};

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_KEY,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV,
  },
});

const store = configureStore({
  reducer,
  preloadedState,
});

const socket = io();
const chats = renderChats(store, socket, rollbar);
const root = document.getElementById('chat');

render(chats, root);
