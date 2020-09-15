import * as React from 'react';
import { render } from 'react-dom';

const App = ({ channels }) => (
  <>
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>{channel.name}</li>
      ))}
    </ul>
  </>
);

const root = document.getElementById('chat');

export default (channels) => render(<App channels={channels} />, root);
