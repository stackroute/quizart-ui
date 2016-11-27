import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardMedia, CardTitle,CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid';
const style = {
  card:{
    width:200,
    height:250,
    marginLeft:90,
    marginBottom:60,
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
    return (
        <div>
      <Card style={style.card} onClick={this.challengePlay} key={this.props.mychallenges.nameOfTheChallenge}>
            <CardMedia
        overlay={<CardTitle title={this.props.mychallenges.nameOfTheChallenge} subtitle={this.props.mychallenges.topic}/>}>
        <img src={this.props.mychallenges.imageUrl} />
      </CardMedia>
      <CardText>
          <p>{this.props.mychallenges.durationInMins}mins  {this.props.mychallenges.durationInSecs}secs</p>
    </CardText>
        </Card>
      </div>
  )
}
}
