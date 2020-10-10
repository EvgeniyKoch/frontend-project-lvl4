import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { actions } from '../../data/slices';
import routes from '../../routes';

const Remove = () => {
  const [loading, setLoading] = React.useState(false);
  const { isOpen } = useSelector((state) => state.modal);
  const { channelId } = useSelector((state) => state.modal.extra);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(actions.closeModal());
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const url = routes.channelPath(channelId);
    const data = { data: { attributes: { channelId } } };
    setLoading(true);
    try {
      await axios.delete(url, data);
    } catch (e) {
      console.log(e);
      dispatch(actions.showToast(true));
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <Modal show={isOpen} onHide={closeModal}>
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Remove channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure?
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button disabled={loading} onClick={closeModal} variant="secondary">Cancel</Button>
          <Button disabled={loading} variant="primary" type="submit">Remove</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Remove;
