import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Channels from './features/channels';
import Messages from './features/messages';

const App = () => (
  <Row className="h-100 pb-3">
    <Col xs="3" className="border-right h-100 overflow-auto">
      <Channels />
    </Col>
    <Col className="h-100">
      <Messages />
    </Col>
  </Row>
);

export default App;
