import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, FormGroup, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

import EntityContext from '../data/context';
import Messages from './Messages.jsx';
import routes from '../routes';
import { actions } from '../data/slices';

const Chat = () => {
  const currentChannelId = useSelector(
    (state) => state.channelsData.currentChannelId,
  );
  const { username } = useContext(EntityContext);
  const dispatch = useDispatch();
  const textInput = React.useRef();

  React.useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleSubmit = async (data) => {
    const url = routes.channelMessagesPath(data.data.attributes.channelId);
    try {
      await axios.post(url, data);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    } catch (e) {
      console.log(e);
      dispatch(actions.showToast(true));
    }
  };

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: (values) => {
      const { message } = values;

      if (message.length === 0) {
        formik.setSubmitting(false);
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

  const { values, handleChange, isSubmitting } = formik;

  return (
    <>
      <Messages currentChannelId={currentChannelId} />
      <Row>
        <Col>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xs={9}>
                <FormGroup controlId="formControlsText">
                  <Form.Control
                    ref={textInput}
                    name="message"
                    type="text"
                    aria-label="message"
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Enter a message"
                  />
                </FormGroup>
              </Col>
              <Col xs={3}>
                <Button
                  aria-label="submit"
                  name="submit"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Send
                </Button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default Chat;
