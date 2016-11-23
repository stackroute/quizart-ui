  import React from 'react';
  import ReactDOM from 'react-dom';
  import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
  import FlatButton from 'material-ui/FlatButton';
  import {Grid, Row, Col} from 'react-flexbox-grid';
  import RaisedButton from 'material-ui/RaisedButton';
  import {blue300} from './../../node_modules/material-ui/styles/colors';
  import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
  import Avatar from 'material-ui/Avatar';
  import Paper from 'material-ui/Paper';
  import {List, ListItem, makeSelectable} from 'material-ui/List';
  import Subheader from 'material-ui/Subheader';
  import {red500, deepOrange400, teal500, blue500, grey900,cyan50,redA400,limeA700,pinkA200} from './../../node_modules/material-ui/styles/colors';
  import Divider from 'material-ui/Divider';
  import appbar from './appbar';
  import TimerSpeed from './timer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

  const style={
    width: '90%', margin: '2px',textAlign:'center',
    backgroundColor:'#F06292',color:'white',

  }
  var res=0;
  var qstn_no=0;
  var quiz=[
  {
    "question": "For which of the following disciplines is Nobel Prize awarded?",
    "options": [
    "Physics and Chemistry",
    "Physiology or Medicine",
    "Literature, Peace and Economics",
    "All of the above"
    ],
    "currect": "All of the above",
    "image":"media/images/nobelprize.png",
    "timelimit":"15000"
  },
  {
    "question": "WWW stands for?",
    "options": [
    "World Whole Web",
    "Wide World Web",
    "Web World Wide",
    "World Wide Web"
    ],
    "currect": "World Wide Web",
    "image":"media/images/www.png",
    "timelimit":"15000"

  },
  {
    "question": "Which of the following are components of Central Processing Unit (CPU) ?",
    "options": [
    "Arithmetic logic unit, Mouse",
    "Arithmetic logic unit, Control unit",
    "Arithmetic logic unit, Integrated Circuits",
    "Control Unit, Monitor"
    ],
    "currect": "Arithmetic logic unit, Control unit",
    "image":null,
    "timelimit":"15000"
  },
  {
    "question": "Who are you?",
    "options": [
    "A",
    "B",
    "C",
    "All of the above"
    ],
    "currect": "B",
    "image":"media/images/whoareu.png",
    "timelimit":"15000"
  },
  {
    "question": "For which of the following disciplines is Nobel Prize awarded?",
    "options": [
    "Physics and Chemistry",
    "Physiology or Medicine",
    "Literature, Peace and Economics",
    "All of the above"
    ],
    "currect": "All of the above",
    "image":"media/images/nobelprize.png",
    "timelimit":"15000"
  },
  {
   "question": "WWW stands for?",
   "options": [
   "World Whole Web",
   "Wide World Web",
   "Web World Wide",
   "World Wide Web"
   ],
   "currect": "World Wide Web",
   "image":"media/images/www.png",
   "timelimit":"15000"

 },
 {
  "question": "Which of the following are components of Central Processing Unit (CPU) ?",
  "options": [
  "Arithmetic logic unit, Mouse",
  "Arithmetic logic unit, Control unit",
  "Arithmetic logic unit, Integrated Circuits",
  "Control Unit, Monitor"
  ],
  "currect": "Arithmetic logic unit, Control unit",
  "image":"media/images/cpu.png",
  "timelimit":"15000"
},
{
  "question": "Who are you?",
  "options": [
  "A",
  "B",
  "C",
  "All of the above"
  ],
  "currect": "B",
  "image":"media/images/whoareu.png",
  "timelimit":"15000"
}
]
var i=0;
var timer=0;
var qstn_len=quiz.length;
var tem=quiz[1].timelimit/15;
var blocks = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
/*-----------------------------------------Adaptive Challenge Creation---------------------------------------------------*/


class ClassicalChallenge extends React.Component
{
 constructor(props) {
   super(props);
   this.state = {open: false,i: 0,result:0,timelimit:0,qstnno:0,result:0,temp:quiz[1].timelimit/15};
   this.handleClick = this.handleClick.bind(this);
 }



 /*-----------------------------------------handdling event button------------------------------------------------------*/

 handleClick(e, text) {
  var val=text;
   var ans=quiz[this.state.qstnno].currect;
   this.setState( {qstnno:this.state.qstnno+1,i:0} );
   qstn_no+=1;
   tem=quiz[this.state.qstnno].timelimit/15;
   this.setState( {temp:tem} );
   if(ans.toUpperCase()===val.toUpperCase()){
     this.setState( {result:this.state.result+1});
   }
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<MuiThemeProvider><TimerSpeed timelimit={quiz[this.state.qstnno].timelimit} blocks={e}/>
    </MuiThemeProvider>, document.getElementById('root'));
}




 /*-----------------------------------------componentDidMount------------------------------------------------------*/

componentDidMount() {
  timer=quiz[this.state.qstnno].timelimit/15;

  this.setState({timelimit:quiz[this.state.qstnno].timelimit});
  this.timerID = setInterval(
    () => this.tick(),
    this.state.temp
    );

 /*-----------------------------------------componentWillMount------------------------------------------------------*/

}
componentWillUnmount() {
  clearInterval(this.timerID);
}



 /*-----------------------------------------tick function------------------------------------------------------*/

tick() {
 i=this.state.i;
  if(this.state.i==15)
  {
    this.setState({
      i:0,timelimit:quiz[this.state.qstnno].timelimit,qstnno:this.state.qstnno+1
    });
    qstn_no+=1;

  }
  else
  {
    this.setState({
      i:i+1,timelimit:this.state.timelimit+1
    });
  }
}



 /*-----------------------------------------render function------------------------------------------------------*/

render()
{
  return(
   <center>
   <Grid>
   <Row>
   <Col xs={12} sm={12} md={12} lg={12}>
   <Paper style={{height:"100%",width: '90%',textAlign: 'center',display: 'inline-block',padding:5,margin:5,backgroundColor:'#F5F5F5'}} zDepth={2}>
   <center>
   <Row style={{height:"100%",textAlign: "justify",textJustify: "interWord"}}>
   <Col xs={9} sm={10} md={10} lg={10}>
    
   <h5 style={{color:"#1A237E",marginTop:20,padding:10,textAlign:'left'}}>{this.state.qstnno+1}) {quiz[this.state.qstnno].question}</h5>  
  </Col>
  <Col xs={2} sm={2} md={2} lg={2}>
  <Avatar style={{padding:20,position:'fixed',backgroundColor:'white'}} size={30}><h3 style={{color:'#1A237E'}}>{this.state.result}</h3>  </Avatar>
  </Col>  
  </Row>
  <Divider/>
  <Row>               
  <Col xs={0} sm={1} md={1} lg={3}>       
  </Col>
  <Col xs={12} sm={10} md={10} lg={6}>
  <center>
  <Card style={{width:'90%',height:260,margin:10}}>
  <CardMedia
  overlay={<div id="root"><TimerSpeed timelimit={quiz[this.state.qstnno].timelimit} blocks={blocks}/></div>} >
  <ImageFun/>
  </CardMedia>
  </Card>
  </center> 
  <Subheader>Choose your answer</Subheader>
  <ListItem  primaryText={quiz[this.state.qstnno].options[0]}  onTouchTap={() => this.handleClick([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],quiz[this.state.qstnno].options[0])}  style={style}/>
  <ListItem  primaryText={quiz[this.state.qstnno].options[1]}  onTouchTap={() => this.handleClick([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],quiz[this.state.qstnno].options[1])}  style={style} />
  <ListItem  primaryText={quiz[this.state.qstnno].options[2]}  onTouchTap={() => this.handleClick([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],quiz[this.state.qstnno].options[2])}  style={style} />
  <ListItem  primaryText={quiz[this.state.qstnno].options[3]}  onTouchTap={() => this.handleClick([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],quiz[this.state.qstnno].options[3])}  style={style} />
  </Col>  
  </Row>
  </center>  
  </Paper>
  </Col>
  </Row>
  </Grid>
  </center>
  );
}
}
function ImageFun(){
  var imagevar=quiz[qstn_no].image
  if(imagevar==null){
    return(
     <img src="media/images/noImageAvailable.gif" style={{height:"260px",width:'80%'}}/>
     );
  }
  else{
    return(
      <img src={quiz[qstn_no].image} style={{height:"260px",width:'80%'}}/>
      );
  }
}
export default ClassicalChallenge;
