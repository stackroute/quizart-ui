import React from 'react';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import {Grid, Row, Col} from 'react-flexbox-grid';
import MediaQuery from 'react-responsive';
var Bouncefix = require('react-bouncefix');
var styles = {
  imageStyle:{
    width:'100%',
    height:'100%',
    opacity:0.6,
    position: 'relative'
  },
  loginDeskStyle:{
    position: 'absolute',
    top:'150px',
    textAlign:'center',
    width: '100%'
  },
  loginMobileStyle:{
    position: 'absolute',
    left: '3px',
    top:'35%',
    textAlign:'center',
    width: '200%'
  }
};
export default class LoginView extends React.Component {
  render() {
    document.body.style.backgroundColor = "#3B3251";
    return (
      <div>

        <img src="./../images/gifnew.gif" style={styles.imageStyle} />
          <MediaQuery minDeviceWidth='1224px'>
            <div className="some-class">
              <div  style={styles.loginDeskStyle}>
                <Grid>
                  <Row>
                      <Col xs={12} sm={12} md={12} lg={12}><Login/></Col>
                    {/* <Col xs={12} sm={12} md={6} lg={6}><SignUp/></Col> */}
                  </Row>
                </Grid>
              </div>
            </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth='1224px' className="some-class">
            <div  style={styles.loginMobileStyle}>
              <Grid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}><Login/></Col>
                  {/* <Col xs={12} sm={12} md={6} lg={6}><SignUp/></Col> */}
                </Row>
              </Grid>
            </div>
      </MediaQuery>
      
      </div>
    );
  }
}
