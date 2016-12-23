import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {Grid,Row} from 'react-flexbox-grid';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import superagent from 'superagent';
// import io from 'socket.io-client';
// var jwt = require('jsonwebtoken');
// var io = require("socket.io");
// var io = require('socket.io-client');

// var socket = null;

export default class CategoryIcon extends React.Component {
  constructor(props)
	{
		super(props);
		this.state={open:false};
	}
  // componentDidMount() {
  //   var socket = io();
  //   socket.emit('queue');
  //   socket.on('msg',function(data){
  //     console.log(data.msgServe);
  //   });
  //
  //   // socket = io.connect({'query': 'token=' + localStorage['token']});
  //   // socket.on('init', this._initializeConversation.bind(this))
  //   // socket.on('send:message', this._recieveMessage.bind(this));
  // }


  handleOpen =() => {
    this.setState({open:true});
  }
	handleClose() {
		this.setState({open:false});
	}
 static get propTypes() {
   return {
     category: React.PropTypes.object.isRequired
   };
}
 render() {
   const actions = [
          <FlatButton
 		                   label="Back to the Topic"
 		                   primary={true}
 		                   onTouchTap={this.handleClose}/>,

 						 <Link to="jeopardyBoard/">
 						 <FlatButton
 						   label="Risk Jeopardy"
 						   primary={true}
             />
 						   </Link>
 						   ];
   const styles={
     imgAva:{
       height:'80px',
       width:'80px',
       marginTop: '20px'
     },
     nameCat: {
       paddingLeft:'20px'
     }

   }

   return (

     <div>
       <Dialog
       title={"You have chosen "+this.props.category.name}
       actions={actions}
       modal={true}
       open={this.state.open}>
       </Dialog>
     <Grid>
       <Row>
         <Avatar style={styles.imgAva} src = {this.props.category.imageUrl} onClick={()=>this.handleOpen(this)}/>
       </Row>
       <br/>
       <Row>
         <small style={styles.nameCat}>{this.props.category.name}</small>
       </Row>
     </Grid>
     <div id="selectedCategory">
     </div>
     </div>

     );
 }
}
