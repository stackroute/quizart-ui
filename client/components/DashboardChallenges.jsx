import React from 'react';
import Card from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
const style = {
  card:{
    width:100,
    height:150,
    textAlign: 'center',
}
};
export default class CategoryIcon extends React.Component {
  constructor(props){
    super(props);
    this.challengePlay=this.challengePlay.bind();
  }
  static get propTypes() {
    return {
    mychallenges: React.PropTypes.object.isRequired
    };
  }
  challengePlay()
  {
      alert("hai");
  }
  render() {
    return (
        <Card  style={style.card} onClick={this.challengePlay} key={this.props.mychallenges.nameOfTheChallenge}>
        <p><strong style={{color:'#3F51B5'}}>Name : {this.props.mychallenges.nameOfTheChallenge}</strong></p>
        <p>Duration : {this.props.mychallenges.durationInMins} </p>
      </Card>

  )
}
}
