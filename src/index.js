// @ts-check
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import reducer from './data/reducer';

import '../assets/application.scss';

// import io from 'socket.io-client';
import renderChats from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const preloadedState = {
  channels: gon.channels,
  currentChannelId: gon.currentChannelId,
  messages: gon.messages,
};

const store = configureStore({
  reducer,
  preloadedState,
});

const chats = renderChats(store);
const root = document.getElementById('chat');

render(chats, root);
