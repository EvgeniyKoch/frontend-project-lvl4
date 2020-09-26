import * as React from 'react';
import { Provider } from 'react-redux';
import cookies from 'js-cookie';
import faker from 'faker';

import App from './components/App';
import UserName from './data/context';
import { addMessage } from './data/actions';

export default (store, socket) => {
  socket.on('newMessage', (payload) => {
    const { data: { attributes } } = payload;
    store.dispatch(addMessage(attributes));
  });

  const username = cookies.get('username') || faker.name.findName();
  cookies.set('username', username);

  return (
    <UserName.Provider value={{ username }}>
      <Provider store={store}>
        <App />
      </Provider>
    </UserName.Provider>
  );
};
