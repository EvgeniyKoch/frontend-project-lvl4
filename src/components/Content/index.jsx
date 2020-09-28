import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Create, Rename, Remove } from '../Modals';
import { CREATE_CHANNEL, RENAME_CHANNEL, REMOVE_CHANNEL } from '../../data/constants';

const selectModal = {
  [CREATE_CHANNEL]: Create,
  [RENAME_CHANNEL]: Rename,
  [REMOVE_CHANNEL]: Remove,
};

const Content = ({ children }) => {
  const { type } = useSelector((state) => state.modal);
  const [channel, chat] = children;
  const Modal = selectModal[type] || Create;

  return (
    <>
      <Modal />
      <Row>
        <Col xs={3}>
          {channel}
        </Col>
        <Col xs={9} style={{ maxHeight: '100vh', overflow: 'hidden' }}>
          {chat}
        </Col>
      </Row>
    </>
  );
};

export default Content;
