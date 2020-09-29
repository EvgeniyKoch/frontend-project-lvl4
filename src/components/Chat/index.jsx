import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, FormGroup, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

import Context from '../../data/context';
import Messages from '../Messages';
import routes from '../../routes';
import { actions } from '../../data/slice';

import './styles.scss';

const Chat = () => {
  const [loading, setLoading] = React.useState(false);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const { username, rollbar } = useContext(Context);
  const dispatch = useDispatch();
  const textInput = React.useRef();

  React.useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleSubmit = async (data) => {
    const url = routes.channelMessagesPath(data.data.attributes.channelId);
    setLoading(true);
    try {
      await axios.post(url, data);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    } catch (e) {
      console.log(e);
      rollbar.error(e);
      dispatch(actions.showToast(true));
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: (values) => {
      const { message } = values;

      if (message.length === 0) {
        return;
      }

      handleSubmit({
        data: {
          attributes: {
            channelId: currentChannelId,
            message,
            username,
          },
        },
      });
    },
  });

  return (
    <>
      <Messages currentChannelId={currentChannelId} />
      <Row>
        <Col className="chat-form">
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xs={9}>
                <FormGroup controlId="formControlsText">
                  <Form.Control
                    ref={textInput}
                    name="message"
                    type="text"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    placeholder="Enter a message"
                  />
                </FormGroup>
              </Col>
              <Col xs={3}>
                <Button disabled={loading} type="submit">Send</Button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default Chat;
