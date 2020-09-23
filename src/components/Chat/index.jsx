import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Col, Form, FormGroup, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';

import Context from '../../data/context';
import sendMessage from '../../data/actions';

import './styles.scss';

const Chat = () => {
  const { username } = useContext(Context);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const { message } = values;
      dispatch(sendMessage({ data: { currentChannelId, message, username } }));
      formik.resetForm({ message: '' });
    },
  });

  return (
    <>
      <Row>
        <Col className="chat-messages">
          Messages
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
