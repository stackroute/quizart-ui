import React from 'react';
import {List, ListItem} from './../../node_modules/material-ui/List';
import Avatar from './../../node_modules/material-ui/Avatar';
import RaisedButton from './../../node_modules/material-ui/RaisedButton';
import Divider from './../../node_modules/material-ui/Divider';
import Subheader from './../../node_modules/material-ui/Subheader';
import {indigo500} from './../../node_modules/material-ui/styles/colors'
import {Row, Col, Grid} from 'react-flexbox-grid';

const styles={
  listStyle:{
  width: 300,
},
imgStyle:{
  height: 50,
  width:50
}

}
class Notification extends React.Component{
	constructor(props){
		super(props);

}
static get propTypes() {
		return {
			notification: React.PropTypes.object.isRequired
		};
	}
	render(){
		return(

			<Row>
			<List style={{width: '500px'}}>
			<ListItem
			style={{textAlign:'left'}}
			primaryText={this.props.notification.name}
			secondaryText={<p>{this.props.notification.about}</p>}
			secondaryTextLines={1}
			leftAvatar={<img src={this.props.notification.picture}  style={styles.imgStyle}/>}
			/>
			<Divider />
			</List>
			</Row>
			);
	}
}
export default Notification;
