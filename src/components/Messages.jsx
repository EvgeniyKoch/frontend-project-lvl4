import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { getColors, titleInitials } from '../data/utils';

const Messages = ({ currentChannelId }) => {
  const messages = useSelector(({ messagesData }) => messagesData.messages);
  const currentChannelMessages = useSelector(({ messagesData }) => (
    messagesData.messages.filter((m) => m.channelId === currentChannelId)));
  const endMessage = React.useRef(null);

  const scrollToBottom = () => {
    endMessage.current.scrollIntoView();
  };

  React.useEffect(scrollToBottom, [messages.length]);

  return (
    <Row className="h-75 border-left border-light">
      <Col>
        {currentChannelMessages.map(({ username, message, id }) => (
          <Row key={id}>
            <div className="d-flex">
              <div
                style={{
                  backgroundColor: getColors(username),
                  width: '40px',
                  height: '40px',
                  margin: '0 10px',
                }}
                className="d-flex justify-content-center align-items-center rounded-circle"
              >
                {titleInitials(username)}
              </div>
              <div>
                <p style={{ color: getColors(username) }} className="m-0">
                  {username}
                  :
                </p>
                <p style={{ color: 'dodgerblue' }}>{message}</p>
              </div>
            </div>
          </Row>
        ))}
        <div ref={endMessage} />
      </Col>
    </Row>
  );
};

export default Messages;
