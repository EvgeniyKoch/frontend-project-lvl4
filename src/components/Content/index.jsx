import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Create, Rename, Remove } from '../Modals';
import Toaster from '../Toast';
import { NEW_CHANNEL, RENAME_CHANNEL, REMOVE_CHANNEL } from '../../data/constants';

import './styles.scss';

const selectModal = {
  [NEW_CHANNEL]: Create,
  [RENAME_CHANNEL]: Rename,
  [REMOVE_CHANNEL]: Remove,
};

const Content = ({ children }) => {
  const { type, isOpen } = useSelector((state) => state.modal);
  const [channel, chat] = children;
  const Modal = selectModal[type];

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
