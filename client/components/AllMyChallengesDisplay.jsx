import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardMedia, CardTitle,CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid';
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
  }
  static get propTypes() {
    return {
    mychallenges: React.PropTypes.object.isRequired
    };
  }

  render() {
    var imgurl;
    if(this.props.mychallenges.imageUrl==null)
      imgurl="http://res.cloudinary.com/deaxb0msww/image/upload/v1480051922/quiztack/circles.jpg"
      else {
        imgurl=this.props.mychallenges.imageUrl;
      }
    return (
        <div>
      <Card style={style.card} onClick={this.challengePlay} key={this.props.mychallenges.nameOfTheChallenge}>
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
