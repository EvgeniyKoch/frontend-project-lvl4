import * as React from 'react';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../data/slice';
import { addChannel } from '../../data/actions';

const Create = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(actions.closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      const { name } = values;
      dispatch(addChannel({
        data: {
          attributes: { name },
        },
      }));
      formik.resetForm();
      closeModal();
    },
  });

  return (
    <Modal show={isOpen} onHide={closeModal}>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsText">
            <Form.Control
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} variant="secondary">Close</Button>
          <Button variant="primary" type="submit">Save channel</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Create;
