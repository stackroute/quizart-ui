import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Row, Col, Grid} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {tile400, white} from 'material-ui/styles/colors';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const styles={
raisedButtonStyles : {
marginTop : '120px'
},
imageStyles :{
width: '70px',
height: '70px',
textAlign: 'center'
},
floatingButtonStyle: {
marginLeft: '20px',
},
flatButtonStyles :{
color:'white',
marginLeft:'10px'
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
<div>
<Row>
<FlatButton
       style={styles.flatButtonStyle}
       label="Replay"
       primary={true}
       onTouchTap={this.handleClose}
     />
     <FlatButton
       label="Share"
       primary={true}
       onTouchTap={this.handleClose}
     />
     <FlatButton
            style={styles.flatButtonStyle}
            label="Home"
            primary={true}
            onTouchTap={this.handleClose}
          />
          </Row>
          </div>
];
return(
<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
<Row center='xs'>
<div>
<RaisedButton label="Scorecard Adaptive" onTouchTap={this.handleOpen} style={styles.raisedButtonStyles}/>
<Dialog
title="you won!!"
titleStyle = { {textAlign : 'center'}}
actions={actions}
autoDetectWindowHeight = {true}
modal={true}
open={this.state.open}
>
<Row>
  <Col xs={12} sm={6} md={6} lg={6}>
  <Row center='xs'>
  <Avatar src="http://res.cloudinary.com/deaxb0msww/image/upload/v1480077576/usericon_i76ywr.png" style={styles.imageStyles} />
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

  </Col>
</Row>

</Dialog>
</div>
</Row>
</MuiThemeProvider>
);
}
}
