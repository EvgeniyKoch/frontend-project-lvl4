import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import gon from 'gon';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

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
};

const store = configureStore({
  reducer,
  preloadedState,
});

const socket = io();
const chats = renderChats(store, socket);
const root = document.getElementById('chat');

render(chats, root);
