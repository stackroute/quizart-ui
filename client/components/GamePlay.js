import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import {blue300} from './../../node_modules/material-ui/styles/colors';
var style
const GamePlay = () => (
<center>
<div>
  <Card className="QuestionCard" style={{width:'90%',height:50,backgroundColor:blue300}}>
   <h1 className="QuestionTitleCard">What is full form of NIIT?</h1>
   <FloatingActionButton secondary={true} iconStyle={{height:'30px',width:'30px'}}>
   <div style={{paddingTop:'55%'}}><h1 className="BuzzerCircle">BUZZER</h1></div>
   </FloatingActionButton> 
  </Card> </div>
  </center>
);
export default GamePlay;