import React from 'react';

import Channels from './Channels';
import Content from './Content';
import Chat from './Chat';

const App = () => (
  <Content>
    <Channels />
    <Chat />
  </Content>
);

export default App;
