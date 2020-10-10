import React from 'react';

import Content from './Content.jsx';
import Chat from './Chat.jsx';
import ErrorBoundary from './ErrorBoundary';
import Channels from './Channels.jsx';

const App = () => (
  <ErrorBoundary>
    <Content>
      <Channels />
      <Chat />
    </Content>
  </ErrorBoundary>
);

export default App;
