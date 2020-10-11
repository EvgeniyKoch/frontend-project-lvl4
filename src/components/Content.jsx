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
    <>
      {isOpen && <Modal />}
      <Toaster />
      <Row>
        <Col xs={3}>
          {channel}
        </Col>
        <Col className="chat" xs={9}>
          {chat}
        </Col>
      </Row>
    </>
  );
};

export default React.memo(Content);
