import React  from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

export default class ChallengePlayDialog extends React.Component
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
    }
  handleClose = () => {
    this.setState({open: false});
  };
  

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}/>,
     
        <Link to="gamePlay/"> 
        <FlatButton
        label="Play"
        primary={true}
        />
        </Link>,
      ];

    return (
      <div>
        <Dialog
          title={this.props.challenge.nameOfTheChallenge}
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}>

          <p>Topic : {this.props.challenge.topic}</p><br></br>
          <p>Questions : {this.props.challenge.totalNoOfQuestions}</p><br></br>
          <p>Duration : {this.props.challenge.durationInMins}</p><br></br>
          <p>Score : {this.props.challenge.scoreForRight} for Right and -{this.props.challenge.scoreForWrong} for wrong</p><br></br>

        </Dialog>
      </div>
    );
  }
}
