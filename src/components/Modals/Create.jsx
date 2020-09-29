import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

import { actions } from '../../data/slice';
import routes from '../../routes';
import validate from './validator';
import Context from '../../data/context';

const Create = () => {
  const { rollbar } = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const { isOpen } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state);
  const dispatch = useDispatch();
  const textInput = React.useRef();

  React.useEffect(() => {
    textInput.current.focus();
  }, []);

  const closeModal = () => {
    dispatch(actions.closeModal());
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: validate(channels),
    onSubmit: async (values) => {
      const url = routes.channelsPath();
      const { name } = values;
      const data = { data: { attributes: { name } } };
      setLoading(true);
      try {
        await axios.post(url, data);
      } catch (e) {
        console.log(e);
        rollbar.error(e);
        dispatch(actions.showToast(true));
      } finally {
        setLoading(false);
        closeModal();
      }
    },
  });

  const { isValid, values, handleSubmit, handleChange, errors, touched } = formik;

  return (
    <Modal show={isOpen} onHide={closeModal}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsText">
            <Form.Control
              isInvalid={!isValid}
              ref={textInput}
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
          <Button onClick={closeModal} variant="secondary">Close</Button>
          <Button disabled={loading} variant="primary" type="submit">Save channel</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Create;
