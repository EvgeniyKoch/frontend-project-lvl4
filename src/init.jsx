import * as React from 'react';
import { Provider } from 'react-redux';
import cookies from 'js-cookie';
import faker from 'faker';

import App from './components/App';
import UserName from './data/context';
import { actions } from './data/slice';
import * as listener from './data/constants';

export default (store, socket, rollbar) => {
  socket.on(listener.NEW_MESSAGE, ({ data: { attributes } }) => {
    store.dispatch(actions.addMessage(attributes));
  });
  socket.on(listener.NEW_CHANNEL, ({ data: { attributes } }) => {
    store.dispatch(actions.addChannel(attributes));
  });
  socket.on(listener.RENAME_CHANNEL, ({ data: { attributes } }) => {
    store.dispatch(actions.renameChannel(attributes));
  });
  socket.on(listener.REMOVE_CHANNEL, ({ data }) => {
    store.dispatch(actions.removeChannel(data));
  });

  const username = cookies.get('username') || faker.name.findName();
  cookies.set('username', username);

  return (
    <UserName.Provider value={{ username, rollbar }}>
      <Provider store={store}>
        <App />
      </Provider>
    </UserName.Provider>
  );
};
