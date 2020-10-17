import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import { delay } from 'nanodelay';
import { SocketIO, Server } from 'mock-socket';
import init from '../../src/init';

const elements = {};
let mockClient; // eslint-disable-line

const host = 'localhost';
const socketUrl = `ws://${host}`;
let mockServer; // eslint-disable-line
nock.disableNetConnect();

beforeEach(async () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  mockServer = new Server(socketUrl);

  mockServer.on('connection', async (socket) => {
    socket.on('sendMessage', (payload) => {
      socket.emit('newMessage', JSON.stringify(payload));
    });

    socket.on('createChannel', (payload) => {
      socket.emit('newChannel', JSON.stringify(payload));
    });

    socket.on('changeChannel', (payload) => {
      socket.emit('renameChannel', JSON.stringify(payload));
    });

    socket.on('deleteChannel', (payload) => {
      socket.emit('removeChannel', JSON.stringify(payload));
    });
  });
  mockClient = new SocketIO(socketUrl);

  const data = {
    channels: [
      { id: 1, name: 'General', removable: false },
      { id: 2, name: 'Random', removable: true },
    ],
    currentChannelId: 1,
    messages: [{
      channelId: 2,
      message: 'Hello my friend',
      username: 'Victor Swaniawski',
      id: 1,
    }],
  };
  const vdom = await init(mockClient, data);
  render(vdom);

  elements.input = screen.getByRole('textbox', { name: 'message' });
  elements.submit = screen.getByRole('button', { name: 'submit' });
  elements.create = screen.getByRole('button', { name: 'create' });
  elements.toggle = screen.getByRole('button', { name: 'toggle' });
});

afterEach(() => {
  mockServer.close();
});

test('send message', async () => {
  const scope = nock(`http://${host}`)
    .post('/api/v1/channels/1/messages')
    .reply(200);

  await act(async () => {
    await userEvent.type(elements.input, 'hi there');
    await userEvent.click(elements.submit);
    await delay(10);
    scope.done();

    const payload = {
      data: {
        attributes: {
          id: 1,
          message: 'hi there',
          nickname: 'Kent Dodds',
          channelId: 1,
        },
      },
    };
    mockClient.emit('sendMessage', payload);
  });

  await waitFor(() => {
    expect(screen.getByText(/hi there/i)).toBeInTheDocument();
  });
});

test('create new channel', async () => {
  const scope = nock(`http://${host}`)
    .post('/api/v1/channels')
    .reply(201);

  await act(async () => {
    await userEvent.click(elements.create);
    await userEvent.type(screen.getByRole('textbox', { name: 'name' }), 'hexlet');
    await userEvent.click(screen.getByText('Save channel'));
    await delay(100);
    scope.done();

    const payload = { data: { attributes: { name: 'hexlet' } } };

    mockClient.emit('createChannel', payload);
  });

  await waitFor(() => {
    expect(screen.getByText(/hexlet/i)).toBeInTheDocument();
  });
});

test('rename channel', async () => {
  const scope = nock(`http://${host}`)
    .patch('/api/v1/channels/2')
    .reply(200);

  await act(async () => {
    await userEvent.click(elements.toggle);
    await userEvent.click(screen.getByText('Rename'));
    await userEvent.type(screen.getByRole('textbox', { name: 'name' }), 'hexlet');
    await userEvent.click(screen.getByText('Save name'));
    await delay(100);
    scope.done();

    const payload = { data: { attributes: { id: 2, name: 'hexlet' } } };

    mockClient.emit('changeChannel', payload);
  });

  await waitFor(() => {
    expect(screen.getByText('hexlet')).toBeInTheDocument();
  });
});

test('remove channel', async () => {
  const scope = nock(`http://${host}`)
    .delete('/api/v1/channels/2')
    .reply(200);

  await act(async () => {
    await userEvent.click(elements.toggle);
    await userEvent.click(screen.getByText('Remove'));
    await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
    await delay(100);
    scope.done();

    const payload = { data: { id: 2 } };

    mockClient.emit('deleteChannel', payload);
  });

  await waitFor(() => {
    expect(elements.toggle).not.toBeInTheDocument();
  });
});

test('show toast', async () => {
  const scope = nock(`http://${host}`)
    .patch('/api/v1/channels/2')
    .reply(400);

  await act(async () => {
    await userEvent.click(elements.toggle);
    await userEvent.click(screen.getByText('Rename'));
    await userEvent.type(screen.getByRole('textbox', { name: 'name' }), 'hexlet');
    await userEvent.click(screen.getByText('Save name'));
    await delay(100);
    scope.done();
  });

  await waitFor(() => {
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });
});
