import React from 'react';
import {
  Row, Col, Form, FormGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';

import './styles.scss';

const Chat = () => {
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm({ message: '' });
    },
  });

  console.log(formik, 'formik');

  return (
    <>
      <Row>
        <Col className="chat-messages">
          Hello
        </Col>
      </Row>
      <Row>
        <Col>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup controlId="formControlsText">
              <Form.Control
                name="message"
                type="text"
                value={formik.values.message}
                onChange={formik.handleChange}
                placeholder="Normal text"
              />
            </FormGroup>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default Chat;
