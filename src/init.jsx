import * as React from 'react';
import { Provider } from 'react-redux';
import cookies from 'js-cookie';
import faker from 'faker';
import App from './components/App';
import UserName from './data/context';

export default (store) => {
  const username = cookies.get('username') || faker.internet.userName();
  cookies.set('username', username);

  return (
    <UserName.Provider value={{ username }}>
      <Provider store={store}>
        <App />
      </Provider>
    </UserName.Provider>
  );
};
