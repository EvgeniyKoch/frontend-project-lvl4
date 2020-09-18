import React from 'react';
import {
  Col, Container, Row, Tab,
} from 'react-bootstrap';
import Channels from '../Channels';
import Chats from '../Chats';

const App = () => (
  <Container>
    <Tab.Container id="left-tabs-example" defaultActiveKey="1">
      <Row>
        <Col xs={3}>
          <Channels />
        </Col>
        <Col xs={9}>
          <Chats />
        </Col>
      </Row>
    </Tab.Container>
  </Container>
);

export default App;
