import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Col, Dropdown, Row } from 'react-bootstrap';

import { actions } from '../../data/slice';
import { NEW_CHANNEL, REMOVE_CHANNEL, RENAME_CHANNEL } from '../../data/constants';

import './style.scss';

const Channels = () => {
  const channels = useSelector(((state) => state.channels));
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();

  const changeChannel = (channelId) => () => {
    dispatch(actions.changeCurrentChannel(channelId));
  };

  const openModal = (type, channelId) => () => {
    dispatch(actions.openModal({
      type,
      data: { channelId },
    }));
  };

  return (
    <div className="channels">
      <Row className="channels-btn_add">
        <Col xs={8}>Channels</Col>
        <Col xs={4}>
          <Button onClick={openModal(NEW_CHANNEL, null)} variant="link">
            +
          </Button>
        </Col>
      </Row>
      {channels.map((channel) => {
        const isCurrent = currentChannelId === channel.id;
        const variantBtn = isCurrent ? 'primary' : 'light';

        return (
          <Row key={channel.id}>
            <Col className="channels-links">
              {!channel.removable && (
                <Button
                  className="channels-btns"
                  onClick={changeChannel(channel.id)}
                  variant={variantBtn}
                >
                  {channel.name}
                </Button>
              )}
              {channel.removable && (
                <Dropdown
                  className="channels-dropdown"
                  key={channel.id}
                  as={ButtonGroup}
                >
                  <Button
                    className="channels-btns"
                    onClick={changeChannel(channel.id)}
                    variant={variantBtn}
                  >
                    {channel.name}
                  </Button>
                  <Dropdown.Toggle className="channels-toggle" variant={variantBtn} />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={openModal(RENAME_CHANNEL, channel.id)}>
                      Rename
                    </Dropdown.Item>
                    <Dropdown.Item onClick={openModal(REMOVE_CHANNEL, channel.id)}>
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
