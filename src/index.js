import { render } from 'react-dom';
import io from 'socket.io-client';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import gon from 'gon';

import '../assets/application.scss';

import renderChats from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io(window.location.origin);
const chats = renderChats(socket, gon);
const root = document.getElementById('chat');

render(chats, root);
