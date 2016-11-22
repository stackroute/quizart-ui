import React from 'react';
import Paper from './../../node_modules/material-ui/Paper';
import {Card, CardMedia, CardActions, CardText, CardTitle} from './../../node_modules/material-ui/Card';
import RaisedButton from './../../node_modules/material-ui/RaisedButton';
import {Grid, Row, Col} from './../../node_modules/react-flexbox-grid';
import {Link} from 'react-router';
const styles = {
  paperStyle:{
  height: 300,
  width: '33%',
  marginTop: 50,
  marginLeft:0,
  marginBottom: 30,
  textAlign: 'center',
  display: 'inline-block'
},
cardStyle:{
  height: 300,
  width: 400,
}
};

const MyDashboard = () => (
  <Row center='xs'>
    <Col xs={12} sm={12} md={4} lg={4}>
  <Paper style = {styles.paperStyle} zDepth={1}>
    <Card style= {styles.cardStyle}>
      <CardMedia overlay={<CardActions><RaisedButton label="Jeopardy"/></CardActions>}>
        {/* <img src="./img/jeopardy.jpg" style= {styles.cardStyle}/> */}
      </CardMedia>
    </Card>
  </Paper>
</Col>
  <Col xs={12} sm={12} md={4} lg={4}>
    <Paper style = {styles.paperStyle} zDepth={1}>
      <Card style= {styles.cardStyle}>
        <CardMedia overlay={<CardActions><RaisedButton label="Classic"/></CardActions>}>
          {/* <img src="./img/classics.png" style= {styles.cardStyle}/> */}
        </CardMedia>
      </Card>
    </Paper>
  </Col>
  <Col xs={12} sm={12} md={4} lg={4}>
    <Paper style = {styles.paperStyle} zDepth={1}>
      <Card style= {styles.cardStyle}>
        <CardMedia overlay={<CardActions><RaisedButton label="Adaptive"/></CardActions>}>
          {/* <img src="./img/adaptive.gif" style= {styles.cardStyle}/> */}
        </CardMedia>
      </Card>
    </Paper>
  </Col>
</Row>
)

export default MyDashboard;
