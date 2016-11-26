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
  import TimerSpeed from './timer';
  import {Link} from 'react-router';
  import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var color='#1A237E';
  const style={
    width: '90%', margin: '2px',textAlign:'center',
    backgroundColor:color,color:'white',

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
    "image":"http://res.cloudinary.com/deaxb0msww/image/upload/v1480077584/nobelprize_nf4q0k.png",
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
    "image":"http://res.cloudinary.com/deaxb0msww/image/upload/v1480077581/www_j80fke.png",
    "timelimit":"16000"

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
    "image":"http://res.cloudinary.com/deaxb0msww/image/upload/v1480077577/whoareu_zcfufc.png",
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
    "image":"http://res.cloudinary.com/deaxb0msww/image/upload/v1480077577/cpu_g58w7k.png",
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
   "image":"http://res.cloudinary.com/deaxb0msww/image/upload/v1480077581/www_j80fke.png",
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
  "image":"http://res.cloudinary.com/deaxb0msww/image/upload/v1480077577/cpu_g58w7k.png",
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
 "image":"http://res.cloudinary.com/deaxb0msww/image/upload/v1480077581/www_j80fke.png",
 "timelimit":"15000"

}
]
var i=0;
var timer=0;
var qstn_len=quiz.length;
var tem=quiz[1].timelimit/15;
var blocks = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
/*-----------------------------------------Adaptive Challenge Creation---------------------------------------------------*/


class GamePlay extends React.Component
{
 constructor(props) {
   super(props);

   this.state = {open: false,i: 0,result:0,timelimit:0,qstnno:0,result:0,temp:quiz[1].timelimit/15,opacity:1,color4:'#1A237E',color3:'#1A237E',color2:'#1A237E',color1:'#1A237E',able:false};
   this.handleClick = this.handleClick.bind(this);
 }



 /*-----------------------------------------handdling event List------------------------------------------------------*/

 handleClick(text,value) {
    var val=text;
   var ans=quiz[this.state.qstnno].currect;
   tem=quiz[this.state.qstnno].timelimit/15;
   this.setState( {temp:tem,able:true,opacity:0.8} );
   var j=0,c=0;
   for(var k=0;k<4;k++)
   {
    if(quiz[this.state.qstnno].options[k]==ans)
    {
      c=k+1;
    }
   }


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
   if(value==1)
   {
      if(ans.toUpperCase()===val.toUpperCase()){
     this.setState( {result:this.state.result+1,color1:'#8BC34A'});
   }
   else
   {
         this.setState( {color1:'#F44336'});

   }
   }
   else if(value==2){
    if(ans.toUpperCase()===val.toUpperCase()){
     this.setState( {result:this.state.result+1,color2:'#8BC34A'});
   }
   else
   {
         this.setState( {color2:'#F44336'});

   }
   }
   else if(value==3){
    if(ans.toUpperCase()===val.toUpperCase()){
     this.setState( {result:this.state.result+1,color3:'#8BC34A'});
   }
   else
   {
         this.setState( {color3:'#F44336'});

   }
   }
   else if(value==4){
    if(ans.toUpperCase()===val.toUpperCase()){
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

   this.setState( {qstnno:this.state.qstnno+1,i:0});
   qstn_no+=1;
   tem=quiz[this.state.qstnno].timelimit/15;
   this.setState( {color1:'#1A237E',color2:'#1A237E',color3:'#1A237E',color4:'#1A237E',able:false,opacity:1});

       ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<MuiThemeProvider><TimerSpeed timelimit={quiz[this.state.qstnno+1].timelimit} blocks={e}/>
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
      i:0,timelimit:quiz[this.state.qstnno].timelimit,qstnno:this.state.qstnno+1,opacity:1
    });
    qstn_no+=1;
     ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<MuiThemeProvider><TimerSpeed timelimit={quiz[this.state.qstnno].timelimit} blocks={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}/>
    </MuiThemeProvider>, document.getElementById('root'));
       this.setState( {color1:'#1A237E',color2:'#1A237E',color3:'#1A237E',color4:'#1A237E',color:'white',able:false});

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
   <Paper style={{height:"100%",width: '90%',textAlign: 'center',display: 'inline-block',padding:5,paddingLeft:10,margin:5,backgroundColor:'#F5F5F5'}} zDepth={1}>
   <center>
   <Row style={{height:"100%",textAlign: "justify",textJustify: "interWord"}}>
   <Col xs={9} sm={10} md={10} lg={10}>
   <h4 style={{color:"#1A237E",margin:20,paddingLeft:'20%',textAlign:'center'}}>{this.state.qstnno+1}) {quiz[this.state.qstnno].question}</h4>
  </Col>
  <Col xs={2} sm={2} md={2} lg={2}>
  <Avatar style={{padding:20,position:'relative',backgroundColor:"white"}} size={30}><h2 style={{color:'#1A237E'}}>{this.state.result}/{qstn_len}</h2>	</Avatar>
  </Col>
  </Row>
  <Divider/>
  <Row>
  <Col xs={0} sm={1} md={1} lg={3}>
  </Col>
  <Col xs={12} sm={10} md={10} lg={6}>
  <center>
  <Card style={{width:'90%',height:260,margin:10,backgroundColor:'#F5F5F5'}}>
  <CardMedia
  overlay={<div id="root"><TimerSpeed timelimit={quiz[this.state.qstnno].timelimit} blocks={blocks}/></div>} >
  <ImageFun/>
  </CardMedia>
  </Card>
  </center>
  <Subheader>Choose your answer</Subheader>



  <ListItem  primaryText={quiz[this.state.qstnno].options[0]}  onTouchTap={() => this.handleClick(quiz[this.state.qstnno].options[0],1)} disabled={this.state.able} style={{width: '90%', margin: '2px',textAlign:'center',backgroundColor:this.state.color1,color:'white',borderTopLeftRadius:'70px' ,borderTopRightRadius: '70px',borderBottomLeftRadius: '70px',borderBottomRightRadius: '70px',opacity:this.state.opacity}}/>
  <ListItem  primaryText={quiz[this.state.qstnno].options[1]}  onTouchTap={() => this.handleClick(quiz[this.state.qstnno].options[1],2)} disabled={this.state.able} style={{width: '90%', margin: '2px',textAlign:'center',backgroundColor:this.state.color2,color:'white',borderTopLeftRadius:'70px' ,borderTopRightRadius: '70px',borderBottomLeftRadius: '70px',borderBottomRightRadius: '70px',opacity:this.state.opacity}} />
  <ListItem  primaryText={quiz[this.state.qstnno].options[2]}  onTouchTap={() => this.handleClick(quiz[this.state.qstnno].options[2],3)} disabled={this.state.able} style={{width: '90%', margin: '2px',textAlign:'center',backgroundColor:this.state.color3,color:'white',borderTopLeftRadius:'70px' ,borderTopRightRadius: '70px',borderBottomLeftRadius: '70px',borderBottomRightRadius: '70px',opacity:this.state.opacity}} />
  <ListItem  primaryText={quiz[this.state.qstnno].options[3]}  onTouchTap={() => this.handleClick(quiz[this.state.qstnno].options[3],4)} disabled={this.state.able} style={{width: '90%', margin: '2px',textAlign:'center',backgroundColor:this.state.color4,color:'white',borderTopLeftRadius:'70px' ,borderTopRightRadius: '70px',borderBottomLeftRadius: '70px',borderBottomRightRadius: '70px',opacity:this.state.opacity}} />
  <FlatButton label="Next >>" primary={true} onTouchTap={() => this.handleChange([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])} style={{textAlign:'right'}}/>

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
     <img src="" style={{height:"260px",width:'80%'}}/>
     );
  }
  else{
    return(
      <img src={quiz[qstn_no].image} style={{height:"260px",width:'80%'}}/>
      );
  }
}
export default GamePlay;
