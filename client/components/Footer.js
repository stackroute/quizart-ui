import React from 'react';
import {Row,Col,Grid} from 'react-flexbox-grid';

const Footer = () => (
  <Grid>
    <Row>
      <Col xs>
        <div>
          <h3>StackRoute</h3>
          Address:
          117, Near SBI, 7th Block,
          Koramangala, Bengaluru,
          Karnataka 560030
        </div>
      </Col>
      <Col xs>
        <div>
          <h3>Contact:</h3>
          Phone: 080 4127 5059
          <br/>Hours: 8am to 7pm
        </div>
      </Col>
      <Col xs>
        <div>
          <h3>Social Media:</h3>
          <Row>
            <Col xs>
                <i className="fa fa-github"/>
            </Col>
            <Col xs>
              <i className="fa fa-linkedin"/>
            </Col>
            <Col xs>
              <i className="fa fa-facebook"/>
            </Col>
            <Col xs>
                <i className="fa fa-twitter"/>
            </Col>
            <Col xs>
                <i className="fa fa-pinterest"/>
            </Col>
            <Col xs>
                <i className="fa fa-instagram"/>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </Grid>

);

export default Footer;
