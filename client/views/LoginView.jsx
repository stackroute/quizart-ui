import React from 'react';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

export default class LoginView extends React.Component {
  render() {
    return (
      <div>

        <Card
          style={{height:"20%"}}>
         <CardMedia
           overlay={<Grid>
             <Row>
               <Col xs={6} sm={6} md={6} lg={6}><Login/></Col>
               { <Col xs={6} sm={6} md={6} lg={6}><SignUp/></Col> }
             </Row>
             {/* <Row>
               <Col xs={12} sm={12} md={12} lg={12}>
                 <RaisedButton
                               type="submit"
                               label="Sign UP"
                               primary={ true }
                                />
               </Col>
             </Row> */}
           </Grid>}
           overlayContainerStyle={{height:"100%"}}
           overlayStyle = {{height:"100%"}}
           >
             <img src="./giphy.gif" height="50%"/>
           {/* <video width="100%" height="20%" autoPlay loop>
             <source src="./../video/bg.mp4" type="video/mp4" />
               Your browser does not support the video tag.

           </video> */}
         </CardMedia>
       </Card>
        {/* <Grid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}><Login/></Col>
            <Col xs={6} sm={6} md={6} lg={6}><SignUp/></Col>
          </Row>
        </Grid> */}

      </div>
    );
  }
}
