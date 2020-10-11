import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Col, Dropdown, Row } from 'react-bootstrap';

import { actions } from '../data/slices';

const Channels = () => {
  const channels = useSelector(((state) => state.channelsData.channels));
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
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
          <Button
            onClick={openModal('newChannel', null)}
            aria-label="create"
            variant="link"
          >
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
                  className="nav-link btn-block mb-2 text-left btn btn-primary"
                  onClick={changeChannel(channel.id)}
                  variant={variantBtn}
                  aria-label={`${channel.name}`}
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
                  <Dropdown.Toggle className="channels-toggle" aria-label="toggle" variant={variantBtn} />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={openModal('renameChannel', channel.id)}>
                      Rename
                    </Dropdown.Item>
                    <Dropdown.Item onClick={openModal('removeChannel', channel.id)}>
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
