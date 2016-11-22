import React from 'react';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import JeopardyCategories from './JeopardyCategories';
import {Grid,Col,Row} from 'react-flexbox-grid';
/*import PlayJeopardy from './PlayJeopardy';*/
import {orange200,grey600}from './../../node_modules/material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import LeaderBoardPaper from './LeaderBoardPaper';


const style = {
  height: window.innerHeight*.3,
  width: '80%',
  textAlign: 'center',
  display: 'inline-block',
  marginTop:'10px',
  marginLeft:'135px'
  /*backgroundColor: grey600*/
  };
 /* sty = {
    height:'70vh',
    width:'30%'
  };*/


const JeopardyCategoriesBody = () => (

  <div>
<div>

    <Paper style={style} zDepth={2}>
    <div>

    <Grid>
         <Col lg={12}>

         <Row center="xs">
         <Col xs={12} sm={6} md={6} lg={6}>
         <h1 style={{marginRight:'900px'}}> Categories </h1>
         </Col>
         <Col xs={12} sm={6} md={6} lg={6}>
         <Link to="JeopardyPlayLink/"><RaisedButton label="Show More" primary={true} style={{marginTop:'25px', marginLeft:'390px'}}/></Link>

          </Col>
          </Row>
    </Col>
  </Grid>
  </div>
  <div>
    <JeopardyCategories/>
    </div>
    </Paper>
    </div>
    <div>
      <LeaderBoardPaper />
    </div>
  </div>
);

export default JeopardyCategoriesBody;
