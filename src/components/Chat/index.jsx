import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Col, Form, FormGroup, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';

import Context from '../../data/context';
import { sendMessage } from '../../data/actions';
import { titleInitials, getColors } from './utils';

import './styles.scss';

const Chat = () => {
  const { username } = useContext(Context);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const messages = useSelector((state) => state.messages);
  const endMessage = React.useRef(null);
  const dispatch = useDispatch();

  const currentChannelMessages = messages.filter((message) => message.channelId === currentChannelId);

  const scrollToBottom = () => {
    endMessage.current.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(scrollToBottom, [currentChannelMessages]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const { message } = values;
      dispatch(sendMessage({
        data: {
          attributes: {
            channelId: currentChannelId,
            message,
            username,
          },
        },
      }));
      formik.resetForm({ message: '' });
    },
  });

  return (
    <>
      <Row>
        <Col
          className="chat-messages"
        >
          {currentChannelMessages?.map(({ username, message, id }) => (
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
      <Row>
        <Col>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xs={9}>
                <FormGroup controlId="formControlsText">
                  <Form.Control
                    name="message"
                    type="text"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    placeholder="Enter a message"
                  />
                </FormGroup>
              </Col>
              <Col xs={3}>
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default Chat;
