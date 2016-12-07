import React from 'react';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import {Grid, Row, Col} from 'react-flexbox-grid';

export default class LoginView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}><Login/></Col>
            <Col xs={12} sm={12} md={6} lg={6}><SignUp/></Col>
          </Row>
        </Grid>

      </div>
    );
  }
}
