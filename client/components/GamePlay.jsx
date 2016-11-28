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
 import superagent from 'superagent';
 // import appbar from './appbar';
 import TimerSpeed from './Timer';
 import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
 <link rel="stylesheet" href="./styles/StyleProj.css"/>
 var color='#1A237E';
var res=0;
var crtAnswer=[];
var timeLimit=1;
var optionArray=[];
var numberOfQuestions=8;
var blocks = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
 /*-----------------------------------------Adaptive Challenge Creation---------------------------------------------------*/
 class GamePlay extends React.Component
 {
  constructor(props) {
    super(props);
    this.state = {topic:[],limit:8,open: false,result:0,timeLimit:0,questionNumber:0,opacity:1,color4:'#1A237E',color3:'#1A237E',color2:'#1A237E',color1:'#1A237E',able:false};
    this.handleClick = this.handleClick.bind(this);
  }
  /*-----------------------------------------handdling event List------------------------------------------------------*/
  handleClick(text,value) {
 var val=text;
 var ans=crtAnswer[this.state.questionNumber];
 this.setState( {able:true,opacity:0.8} );
 var j=0,c=0;
 for(var k=0;k<4;k++)
 {
   if(optionArray[this.state.questionNumber][k]==ans)
   {
     c=k+1;
   }
 }
/*-------------Changing colour of Correct option----------------------------------------*/
 if(c==1)
 {
   this.setState({color1:'#8BC34A'});
 }
 else if(c==2)
 {
   this.setState({color2:'#8BC34A'});
 }
 else if(c==3)
 {
   this.setState({color3:'#8BC34A'});
 }
 else if(c==4)
 {
   this.setState({color4:'#8BC34A'});
 }
/*---------Changing colour of InCorrect option--------------------------------------------*/
 if(value==1)
 {
   if(ans===val){
    this.setState( {result:this.state.result+1,color1:'#8BC34A'});
  }
  else
  {
    this.setState( {color1:'#F44336'});
  }
   }
 else if(value==2){
   if(ans===val){
     this.setState( {result:this.state.result+1,color2:'#8BC34A'});
   }
   else
   {
     this.setState( {color2:'#F44336'});
   }
 }
 else if(value==3){
   if(ans===val){
     this.setState( {result:this.state.result+1,color3:'#8BC34A'});
   }
   else
   {
     this.setState( {color3:'#F44336'});
   }
 }
 else if(value==4){
   if(ans===val){
     this.setState( {result:this.state.result+1,color4:'#8BC34A'});
   }
   else
   {
     this.setState( {color4:'#F44336'});
   }
 }
}
/*-----------------------------------------handdling event Next------------------------------------------------------*/
handleChange(e) {
this.setState( {questionNumber:this.state.questionNumber+1});
this.setState( {color1:'#1A237E',color2:'#1A237E',color3:'#1A237E',color4:'#1A237E',able:false,opacity:1});
}
/*-----------------------------------------componentDidMount------------------------------------------------------*/
componentDidMount() {
timeLimit=(timeLimit*(60*1000))/15;
this.setState({timeLimit: timeLimit});
superagent
.get('http://localhost:3000/topic?_limit='+this.state.limit)
.end((err, res) => {
 this.setState({topic: res.body});
});
}
/*-----------------------------------------componentWillMount------------------------------------------------------*/
componentWillUnmount() {
return 0;
}
/*-----------------------------------------render function------------------------------------------------------*/
render()
{
/*-------------------------------------Fetching Images Fron array topic---------------------------*/

const TopicImage = this.state.topic ? this.state.topic.map((topics) => {
 return (
   <CardMedia
   overlay={<div id="root"><TimerSpeed timeLimit={this.state.timeLimit} blocks={blocks}/></div>} >
   <img src={topics.image} style={{height:"260px",width:'80%'}}/>
   </CardMedia>
 );
}) : null;
/*--------------------------------------Fetching Questions Fron array topic-------------------------*/
const TopicQuestions = this.state.topic ? this.state.topic.map((topics) => {
 return (
 <Col xs={9} sm={10} md={10} lg={10} className="Questions">
  <h4>{this.state.questionNumber+1}) {topics.question}</h4>
 </Col>
 );
}) : null;
/*--------------------------------------Fetching Correct Options Fron array topic--------------------*/
const TopicCorrect = this.state.topic ? this.state.topic.map((topics) => {
 return(
   topics.correctOption
 );
}) : null;
crtAnswer=TopicCorrect;
/*--------------------------------------Fetching Options Fron array topic-----------------------------*/
const TopicOptions = this.state.topic ? this.state.topic.map((topics) => {
 return (
    <div className="Options">
      <ListItem  primaryText={topics.options[0]}  onTouchTap={() => this.handleClick(topics.options[0],1)} disabled={this.state.able} style={{width: '90%', margin: '2px',textAlign:'center',backgroundColor:this.state.color1,color:'white',borderTopLeftRadius:'70px' ,borderTopRightRadius: '70px',borderBottomLeftRadius: '70px',borderBottomRightRadius: '70px',opacity:this.state.opacity}}/>
      <ListItem  primaryText={topics.options[1]}  onTouchTap={() => this.handleClick(topics.options[1],2)} disabled={this.state.able} style={{width: '90%', margin: '2px',textAlign:'center',backgroundColor:this.state.color2,color:'white',borderTopLeftRadius:'70px' ,borderTopRightRadius: '70px',borderBottomLeftRadius: '70px',borderBottomRightRadius: '70px',opacity:this.state.opacity}} />
      <ListItem  primaryText={topics.options[2]}  onTouchTap={() => this.handleClick(topics.options[2],3)} disabled={this.state.able} style={{width: '90%', margin: '2px',textAlign:'center',backgroundColor:this.state.color3,color:'white',borderTopLeftRadius:'70px' ,borderTopRightRadius: '70px',borderBottomLeftRadius: '70px',borderBottomRightRadius: '70px',opacity:this.state.opacity}} />
      <ListItem  primaryText={topics.options[3]}  onTouchTap={() => this.handleClick(topics.options[3],4)} disabled={this.state.able} style={{width: '90%', margin: '2px',textAlign:'center',backgroundColor:this.state.color4,color:'white',borderTopLeftRadius:'70px' ,borderTopRightRadius: '70px',borderBottomLeftRadius: '70px',borderBottomRightRadius: '70px',opacity:this.state.opacity}} />
    </div>
  );
}) : null;
const TopicOptionsForCheck = this.state.topic ? this.state.topic.map((topics) => {
 return (
  topics.options
  );
}) : null;
optionArray=TopicOptionsForCheck;
 return(
  <center>
  <Grid>
  <Row>
  <Col xs={12} sm={12} md={12} lg={12}>
   <Paper style={{height:"100%",width: '90%',textAlign: 'center',display: 'inline-block',padding:5,paddingLeft:10,margin:5,backgroundColor:'#F5F5F5'}} zDepth={1}>
  <center>
  <Row style={{height:"100%",textAlign: "justify",textJustify: "interWord"}}>
  {TopicQuestions[this.state.questionNumber]}
  <Col xs={2} sm={2} md={2} lg={2}>
  <Avatar style={{padding:15,position:'relative',backgroundColor:"#1A237E"}} size={30}><h3 style={{color:'white'}}>{this.state.result}/{numberOfQuestions}</h3> </Avatar>
  </Col>
  </Row>
  <Divider/>
  <Row>
  <Col xs={0} sm={1} md={1} lg={3}>
  </Col>
  <Col xs={12} sm={10} md={10} lg={6}>
  <center>
  <Card style={{width:'90%',height:260,margin:10,backgroundColor:'#F5F5F5'}}>
  {TopicImage[this.state.questionNumber]}
  </Card>
  </center>
  <Subheader>Choose your answer</Subheader>
  {TopicOptions[this.state.questionNumber]}
  <FlatButton label="Next >>" secondary={true} onTouchTap={() => this.handleChange()} style={{textAlign:'right'}}/>
  <FlatButton label="Submit" secondary={true}  style={{textAlign:'right'}}/>
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
export default GamePlay;
