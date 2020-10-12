import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

import validate from './validator';
import { actions } from '../../data/slices';
import routes from '../../routes';

const Rename = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const channels = useSelector((state) => state.channelsData.channels);
  const channelId = useSelector((state) => state.modal.extra.channelId);
  const { name } = useSelector((state) => state.channelsData.channels.find((c) => c.id === channelId));
  const dispatch = useDispatch();
  const textInput = React.useRef();

  React.useEffect(() => {
    setTimeout(() => textInput.current.select());
  }, []);

  const closeModal = () => {
    dispatch(actions.closeModal());
  };

  const formik = useFormik({
    initialValues: { name },
    validationSchema: validate(channels),
    onSubmit: async (values) => {
      const url = routes.channelPath(channelId);
      const data = { data: { attributes: { channelId, name: values.name } } };
      try {
        await axios.patch(url, data);
      } catch (e) {
        console.log(e);
        dispatch(actions.showToast(true));
      } finally {
        closeModal();
      }
    },
  });

  const { isValid, isSubmitting, values, handleSubmit, handleChange, errors, touched } = formik;

  return (
    <Modal show={isOpen} onHide={closeModal}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsText">
            <Form.Control
              isInvalid={!isValid}
              ref={textInput}
              aria-label="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && touched.name && (
              <Form.Control.Feedback className="d-block mb-2" type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            )}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={isSubmitting} onClick={closeModal} variant="secondary">Cancel</Button>
          <Button disabled={isSubmitting} variant="primary" type="submit">Save name</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Rename;
