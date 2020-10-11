import * as React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cookies from 'js-cookie';
import faker from 'faker';
import Rollbar from 'rollbar';

import App from './components/App';
import Context from './data/context';
import reducer, { actions } from './data/slices';
import { deserialize } from './data/utils';

import './styles.scss';

export default (socket, { currentChannelId, channels, messages }) => {
  const logTracking = new Rollbar({
    accessToken: process.env.ROLLBAR_KEY,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: process.env.NODE_ENV,
    },
  });

  const store = configureStore({
    reducer,
    preloadedState: {
      channelsData: { channels, currentChannelId },
      messagesData: { messages },
    },
  });

  const username = cookies.get('username') || faker.name.findName();
  cookies.set('username', username);

  const dom = (
    <Context.Provider value={{ username, logTracking }}>
      <Provider store={store}>
        <App />
      </Provider>
    </Context.Provider>
  );

  socket.on('newMessage', (payload) => {
    const { data: { attributes } } = deserialize(payload);
    store.dispatch(actions.addMessage(attributes));
  });
  socket.on('newChannel', (payload) => {
    const { data: { attributes } } = deserialize(payload);
    store.dispatch(actions.addChannel(attributes));
  });
  socket.on('renameChannel', (payload) => {
    const { data: { attributes } } = deserialize(payload);
    store.dispatch(actions.renameChannel(attributes));
  });
  socket.on('removeChannel', (payload) => {
    const { data } = deserialize(payload);
    store.dispatch(actions.removeChannel(data));
  });

  return dom;
};
