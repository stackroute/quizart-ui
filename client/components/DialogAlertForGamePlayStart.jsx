import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';

export default class DisplayDialog extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={open:this.props.open};
	}
	handleClose =() => {
		this.setState({open:false});
		
	};
	
	render() {
		return(
			<Dialog
			title={"You have chosen "+this.props.category}
			actions={actions}
			modal={true}
			open={this.state.open}>
			</Dialog>);
	}
}
