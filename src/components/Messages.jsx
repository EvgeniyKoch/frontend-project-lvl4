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
    <Row>
      <Col className="chat-messages">
        {currentChannelMessages.map(({ username, message, id }) => (
          <Row key={id}>
            <div
              className="message-wrapper"
            >
              <div
                style={{ backgroundColor: getColors(username), borderRadius: '50%' }}
                className="message-name"
              >
                {titleInitials(username)}
              </div>
              <div>
                <p style={{ color: getColors(username) }}>
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
