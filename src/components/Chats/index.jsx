import React from 'react';
import { useSelector } from 'react-redux';
import { Tab } from 'react-bootstrap';

import Chat from '../Chat';

const Chats = () => {
  const channels = useSelector(((state) => state.channels));

  return (
    <Tab.Content>
      {channels.map((channel) => (
        <Tab.Pane key={channel.id} eventKey={`${channel.id}`}>
          <Chat />
        </Tab.Pane>
      ))}
    </Tab.Content>
  );
};

export default Chats;
