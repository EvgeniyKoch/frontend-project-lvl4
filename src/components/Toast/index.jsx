import * as React from 'react';
import { Toast } from 'react-bootstrap';

import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../data/slice';

const Toaster = () => {
  const isOpen = useSelector((state) => state.toast.isOpen);
  const dispatch = useDispatch();

  const closeToast = () => {
    dispatch(actions.showToast(false));
  };

  return (
    <Toast className="toast" onClose={closeToast} show={isOpen} delay={3000} autohide>
      <Toast.Body className="toast-body">Something went wrong!</Toast.Body>
    </Toast>

  );
};

export default Toaster;
