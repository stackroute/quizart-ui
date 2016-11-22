import React  from 'react';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

var friendlist=[{friend:'Sita'},{friend:'Ram'},{friend:'Hari'}];
var requestSendTo;
export default class FriendRequest extends React.Component
{
  constructor(props) {
    super(props);
  this.state = {
    open: this.props.open,
    checked:false,
  };
 this.handleChange=this.handleChange.bind(this);
}
  handleChange(e) {
   this.setState(prevState => ({
     checked: !prevState.checked
    }));
   requestSendTo=e.target.value;
    } 
  handleClose = () => {
    this.setState({open: false});
    alert("Friend Request send to "+requestSendTo);
  };

  render() {
    var friends=[];
  for(let value in friendlist)
  {
   friends.push(<Checkbox key={friendlist[value].friend} label={friendlist[value].friend} value={friendlist[value].friend} onCheck={this.handleChange} />);
  }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}/>,
      <FlatButton
        label="Send"
        primary={true}
        onTouchTap={this.handleClose}/>,
      ];

    return (
      <div>
        <Dialog
          title="Send FriendRequest"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          {friends}
        </Dialog>
      </div>
    );
  }
}
