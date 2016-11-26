import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Row, Col, Grid} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import {tile400} from 'material-ui/styles/colors';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const styles={
raisedButtonStyles : {
marginTop : '20px'
},
imageStyles :{
width: '260px',
height: '300px',
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
<RaisedButton label="Scorecard " onTouchTap={this.handleOpen} style={styles.raisedButtonStyles}/>
<Dialog
title="Congratulations!! you win"
titleStyle = { {textAlign : 'center'}}
actions={actions}
autoDetectWindowHeight = {true}
modal={true}
open={this.state.open}
>
<Row>
  <Col xs={12} sm={6} md={6} lg={6}>
  <Row center='xs'>
  <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480077576/usericon_i76ywr.png" style={styles.imageStyles} />
  </Row>
  </Col>
  <Col xs={12} sm={6} md={6} lg={6}>
    <List>
      <ListItem secondaryText={<p><span style={{color: '#00bcd4'}}> Player's Name: </span></p>} hoverColor="transparent" />
      <Divider />
      <ListItem secondaryText={<p><span style={{color: '#00bcd4'}}> Rank: </span></p>} hoverColor="transparent"/>
      <Divider />
      <ListItem  secondaryText={<p><span style={{color: '#00bcd4'}}> Score: </span></p>} hoverColor="transparent" />
      <Divider />
      <ListItem secondaryText={<p><span style={{color: '#00bcd4'}}> Categories: </span></p>}  hoverColor="transparent"/>
      <Divider />

    </List>
    <FloatingActionButton
    mini={true}
    style={styles.floatingButtonStyle}
    backgroundColor="#3b5998"
    hoverColor='#3b5998'
    ><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480056892/facebook_xyavfp.png" /></FloatingActionButton>
    <FloatingActionButton
    mini={true}
    style={styles.floatingButtonStyle}
    backgroundColor="#55acee"
    ><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480131003/twitter1_zdc0lb.png" /></FloatingActionButton>
    <FloatingActionButton
    mini={true}
    style={styles.floatingButtonStyle}
    backgroundColor="#007bb5"
    ><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480056894/linkedIn_odt7lf.png" /></FloatingActionButton>
    <FloatingActionButton
    mini={true}
    style={styles.floatingButtonStyle}
    backgroundColor="#bb0000"
    ><img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480131003/youtube_white_you_mkscvn.png" /></FloatingActionButton>

  </Col>
</Row>

</Dialog>
</div>
</Row>
</MuiThemeProvider>
);
}
}
