import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid';
const style = {
  card:{
    width:100,
    height:150,
    marginLeft:30,
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
        <Card  style={style.card} onClick={this.challengePlay} key={this.props.mychallenges.nameOfTheChallenge}>
        <p><strong style={{color:'#3F51B5'}}>Name : {this.props.mychallenges.nameOfTheChallenge}</strong></p>
        <p>Topic : {this.props.mychallenges.topic}</p>
        <p>Duration : {this.props.mychallenges.durationInMins} </p>
      </Card>
      </div>
  )
}
}
