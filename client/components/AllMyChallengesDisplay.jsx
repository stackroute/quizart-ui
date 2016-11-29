import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardMedia, CardTitle,CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChallengePlayDialog from './ChallengePlayDialog';
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
  this.challengePlay=this.challengePlay.bind(this);
  }
  static get propTypes() {
    return {
    mychallenges: React.PropTypes.object.isRequired
    };
  }
  challengePlay(){
    this.setState({
      isOpenDialog: true
    });
  }

  render() {
    var imgurl;
    if(this.props.mychallenges.imageUrl==null)
      imgurl="http://res.cloudinary.com/deaxb0msww/image/upload/v1480260112/thumbsup_emclkx.png"
      else {
        imgurl=this.props.mychallenges.imageUrl;
      }
    return (
        <div>
      <Card style={style.card} onClick={this.challengePlay} >
            <CardMedia
        overlay={<CardTitle title={this.props.mychallenges.nameOfTheChallenge} subtitle={this.props.mychallenges.topic}/>}>
        <img src={imgurl}/>
      </CardMedia>
      <CardText>
          <p>{this.props.mychallenges.durationInMins}mins  {this.props.mychallenges.durationInSecs}secs</p>
    </CardText>
        </Card>

      <div>
        {this.state.isOpenDialog ? <ChallengePlayDialog  challenge={this.props.mychallenges} open={true} /> : null}
      </div>  </div>
  )
}
}
