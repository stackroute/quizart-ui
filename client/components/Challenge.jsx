import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import {Card, CardMedia, CardTitle,CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import {Grid, Row, Col} from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const style = {
  card:{
    height:'200px',
    width:'80px',
    marginLeft:'30px',
    textAlign: 'center',
},
cardtext:{
  whiteSpace: 'normal',
  wordWrap: 'break-word'
},
};
export default class CategoryIcon extends React.Component {
  constructor(props){
    super(props);
      this.state = { isOpenDialog: false };
      this.handleDialogClose=this.handleDialogClose.bind(this)
  }
  static get propTypes() {
    return {
    mychallenges: React.PropTypes.object.isRequired
    };
  }
  handleDialogOpen()
  {
    this.setState({
    isOpenDialog: true
    });
  }
  handleDialogClose() {
    this.setState({
    isOpenDialog: false
    });
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogClose}/>,

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
            title={this.props.mychallenges.nameOfTheChallenge}
            actions={actions}
            modal={false}
          open={this.state.isOpenDialog}
            autoScrollBodyContent={true}
            onRequestClose={this.handleDialogClose}>

            <p>Topic : {this.props.mychallenges.topic}</p><br></br>
            <p>Questions : {this.props.mychallenges.totalNoOfQuestions}</p><br></br>
            <p>Duration : {this.props.mychallenges.durationInMins}</p><br></br>
            <p>Score : {this.props.mychallenges.scoreForRight} for Right and -{this.props.mychallenges.scoreForWrong} for wrong</p><br></br>

          </Dialog>
        <Card  style={style.card} onClick={()=>this.handleDialogOpen(this)} key={this.props.mychallenges.nameOfTheChallenge}>
          <CardMedia>
              <img src={this.props.mychallenges.imageUrl} />
          </CardMedia>
          <CardText style={style.cardtext}>
          <p><strong>{this.props.mychallenges.nameOfTheChallenge}</strong></p>
          <p><small>{this.props.mychallenges.durationInMins}mins {this.props.mychallenges.durationInSecs}secs </small></p>
          </CardText>
      </Card>
    </div>
  )
}
}
