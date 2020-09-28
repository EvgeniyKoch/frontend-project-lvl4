import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Col, Dropdown, Row } from 'react-bootstrap';

import { actions } from '../../data/slice';

const Channels = () => {
  const channels = useSelector(((state) => state.channels));
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();

  const changeChannel = (channelId) => () => {
    dispatch(actions.changeCurrentChannel(channelId));
  };

  const createChannels = () => {
    dispatch(actions.createChannels());
  };

  const renameChannel = (channelId) => () => {
    dispatch(actions.renameChannel({ channelId }));
  };

  const removeChannel = (channelId) => () => {
    dispatch(actions.removeChannel({ channelId }));
  };

  return (
    <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
      <Row style={{ marginBottom: '16px', alignItems: 'center' }}>
        <Col xs={8}>Channels</Col>
        <Col xs={4}>
          <Button onClick={createChannels} variant="link">
            +
          </Button>
        </Col>
      </Row>
      {channels.map((channel) => {
        const isCurrent = currentChannelId === channel.id;
        const variantBtn = isCurrent ? 'primary' : 'light';

        return (
          <Row key={channel.id}>
            <Col style={{ marginBottom: '10px' }}>
              {!channel.removable && (
                <Button
                  style={{ width: '80%' }}
                  onClick={changeChannel(channel.id)}
                  variant={variantBtn}
                >
                  {channel.name}
                </Button>
              )}
              {channel.removable && (
                <Dropdown key={channel.id} as={ButtonGroup} style={{ width: '100%', marginBottom: '10px' }}>
                  <Button
                    style={{ width: '80%' }}
                    onClick={changeChannel(channel.id)}
                    variant={variantBtn}
                  >
                    {channel.name}
                  </Button>
                  <Dropdown.Toggle style={{ textAlign: 'end' }} variant={variantBtn} />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={renameChannel(channel.id)}>
                      Rename
                    </Dropdown.Item>
                    <Dropdown.Item onClick={removeChannel(channel.id)}>
                      Remove
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default Channels;
