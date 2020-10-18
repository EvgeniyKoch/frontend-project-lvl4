import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Create, Rename, Remove } from './Modals';
import Toaster from './Toast';

const selectModal = {
  newChannel: Create,
  renameChannel: Rename,
  removeChannel: Remove,
};

const Content = ({ children }) => {
  const { type, isOpen } = useSelector((state) => state.modal);
  const [channel, chat] = children;
  const Modal = selectModal[type] || Create;

  return (
    <div className="h-100">
      {isOpen && <Modal />}
      <Toaster />
      <Row className="h-100">
        <Col xs={3}>{channel}</Col>
        <Col className="h-100" xs={9}>
          {chat}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Content);
