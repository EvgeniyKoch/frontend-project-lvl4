import * as React from 'react';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../data/slice';
import { deleteChannel } from '../../data/actions';

const Remove = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const { channelId } = useSelector((state) => state.modal.extra);
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
      dispatch(deleteChannel({
        data: {
          attributes: { channelId },
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
          <Modal.Title>Remove channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure?
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={closeModal} variant="secondary">Cancel</Button>
          <Button variant="primary" type="submit">Remove</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Remove;
