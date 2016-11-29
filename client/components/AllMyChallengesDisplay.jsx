import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardMedia, CardTitle,CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import Dialog from 'material-ui/Dialog';
const style = {
  card:{
    width:'200px',
    height:'250px',
    marginLeft:'20px',
    marginBottom:'60px',
    textAlign: 'center',
}
};
export default class AllMyChallengesDisplay extends React.Component {
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

    var imgurl;
    if(this.props.mychallenges.imageUrl==null)
      imgurl="http://res.cloudinary.com/deaxb0msww/image/upload/v1480260112/thumbsup_emclkx.png"
      else {
        imgurl=this.props.mychallenges.imageUrl;
      }
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
      <Card style={style.card} onClick={()=>this.handleDialogOpen(this)} key={this.props.mychallenges.nameOfTheChallenge}>
            <CardMedia
        overlay={<CardTitle title={this.props.mychallenges.nameOfTheChallenge} subtitle={this.props.mychallenges.topic}/>}>
        <img src={imgurl}/>
      </CardMedia>
      <CardText>
          <p>{this.props.mychallenges.durationInMins}mins  {this.props.mychallenges.durationInSecs}secs</p>
    </CardText>
        </Card>
 </div>
  )
}
}
