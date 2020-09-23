import React from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';

const Channels = () => {
  const channels = useSelector(((state) => state.channels));

  return (
    <Nav variant="pills" className="flex-column">
      {channels.map((channel) => (
        <Nav.Item key={channel.id}>
          <Nav.Link eventKey={`${channel.id}`}>{channel.name}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Channels;
