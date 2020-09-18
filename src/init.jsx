import * as React from 'react';
import { Provider } from 'react-redux';

import App from './scenes/App';

export default (store) => (
  <Provider store={store}>
    <App />
  </Provider>
);
