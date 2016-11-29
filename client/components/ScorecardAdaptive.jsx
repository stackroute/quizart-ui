import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Row, Col, Grid} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import {tile400} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import SocialShare from 'material-ui/svg-icons/social/share';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MediaQuery from 'react-responsive';

var winOrNot='';
const styles={

raisedButtonStyles : {
marginTop : '20px'
},
avatarStyle : {
  width:'80px',
  height: '80px'
},
imageStyles :{
width: '250px',
height: '250px',
textAlign: 'center'
},
floatingButtonStyle: {
marginLeft: '20px'
},
flatButtonStyles :{
color:'white'
}
}

export default class ScorecardAdaptive extends React.Component{
state = {
open: false
};
handleOpen = () =>{
this.setState({open:true});
var percentage=(this.props.score/this.props.numberOfQuestions)*100;
if(percentage>50)
{
  winOrNot="Congratulations!! you won";
}
else
{
  winOrNot="Sorry!! you loss";
}
console.log(percentage);
console.log(winOrNot);

};

handleClose = () =>{
this.setState({open:false});
};

render(){
const actions=[
<FlatButton
style={styles.flatButtonStyle}
backgroundColor="#00bcd4"
       label="Replay"
       primary={true}
       onTouchTap={this.handleClose}
     />,
     <FlatButton
       label="Next Play"
       primary={true}
       onTouchTap={this.handleClose}
     />,
];
return(
<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
<Row center='xs'>
<div>
<FlatButton label="Submit " primary={true} onTouchTap={this.handleOpen} style={styles.raisedButtonStyles}/>
<Dialog
title={winOrNot}
titleStyle = { {textAlign : 'center'}}
actions={actions}
autoDetectWindowHeight = {true}
modal={true}
open={this.state.open}
>
<Row>
  <Col xs={12} sm={6} md={6} lg={6}>
  <Row center='xs'>
  <MediaQuery minDeviceWidth='1224px'>
  <div className="some-class">
  <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480077576/usericon_i76ywr.png" style={styles.imageStyles} />
  </div>
  </MediaQuery>
  <MediaQuery maxDeviceWidth='1224px' className="some-class">
  <Avatar src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480077576/usericon_i76ywr.png" style={styles.avatarStyle} />
  </MediaQuery>
  </Row>
  </Col>
  <Col xs={12} sm={6} md={6} lg={6}>
    <List>
      <ListItem secondaryText={<p><span style={{color: '#00bcd4'}}> Player's Name: </span></p>} hoverColor="transparent" />
      <Divider />
      <ListItem secondaryText={<p><span style={{color: '#00bcd4'}}> Rank: </span></p>} hoverColor="transparent"/>
      <Divider />
      <ListItem  secondaryText={<p><span style={{color: '#00bcd4'}}> Score: <span style={{fontSize: '15px' , color: 'white' ,marginLeft: '14px'}}> {this.props.score}</span> </span></p>} hoverColor="transparent" />
      <Divider />
      <ListItem secondaryText={<p><span style={{color: '#00bcd4'}}> Categories: </span></p>}  hoverColor="transparent"/>
      <Divider />

    </List>

    <MediaQuery minDeviceWidth='1224px'>
    <div className="shareButton">
    <Row>
    <List>
      <ListItem 
      secondaryText={<p><span style={{color: '#00bcd4'}}> Share: </span></p>} 
      hoverColor="transparent"/>
    <FloatingActionButton
    mini={true}
    style={styles.floatingButtonStyle}
    backgroundColor="#3b5998"
    hoverColor='#3b5998'
    ><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480330685/facebook_ghaxz0.png" /></FloatingActionButton>
    <FloatingActionButton
    mini={true}
    style={styles.floatingButtonStyle}
    backgroundColor="#55acee"
    ><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480330685/twitter_k3hcfl.png" /></FloatingActionButton>
    <FloatingActionButton
    mini={true}
    style={styles.floatingButtonStyle}
    backgroundColor="#007bb5"
    ><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480330685/linkedin_b1wsmu.png" /></FloatingActionButton>
    <FloatingActionButton
    mini={true}
    style={styles.floatingButtonStyle}
    backgroundColor="#bb0000"
    ><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480330685/pinterest_gggkhx.png" /></FloatingActionButton>
    </List>
    </Row>
    </div>
    </MediaQuery>
    <MediaQuery maxDeviceWidth='1224px' className="shareButton">
    <Row center='xs'>
    <RaisedButton
      label="Share"
      labelPosition="after"
      secondry={true}
      icon={<SocialShare />}
    >
    </RaisedButton>
    </Row>
    </MediaQuery>

   
  </Col>
</Row>

</Dialog>
</div>
</Row>
</MuiThemeProvider>
);
}
}