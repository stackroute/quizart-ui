import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const styles={
height:window.innerHeight*.4,
width:'50%',
marginTop:'20px'

}

const PlayJeopardy = () => (
  <center>
  {/*<Card style={{marginTop:'30px',width:'50%',height:'window.innerHeight*0.3'}}>*/}

 <Paper style={styles} zDepth={2}>
    {/*<CardTitle title="Card title"/>*/}


     <img src= './img/totalusers.jpg' style={{marginTop:'15px'}}/>
    <br />
     <span style={{position: 'relative', top: '-20px', color: 'black',fontSize:'120%'}}> <br/>235665</span>
            <br />

            <img src='http://www.conceptdraw.com/How-To-Guide/picture/Percentage-pie-chart-DA-determinations.png' style={{height:'200px',width:'100%'}}/>


<RaisedButton label="Jeopardy" secondary={true} style={{marginTop:'5px'}} />

  </Paper>
  {/*<RaisedButton label="Jeopardy" secondary={true} />*/}

  </center>
);

export default PlayJeopardy;
