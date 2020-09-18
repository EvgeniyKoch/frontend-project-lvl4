import React from 'react';
import { useSelector } from 'react-redux';
import { Tab } from 'react-bootstrap';

import Chat from './components/Chat';

const Chats = () => {
  const messages = useSelector(((state) => state.messages));

  return (
    <Tab.Content>
      <Tab.Pane eventKey="1">
        <Chat />
      </Tab.Pane>
      <Tab.Pane eventKey="2">
        <Chat />
      </Tab.Pane>
    </Tab.Content>
  );
}

export default Chats;
