import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardMedia, CardTitle,CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog'
import {Grid, Row, Col} from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChallengePlayDialog from './ChallengePlayDialog';
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
    return (
        <div>
        <Card  style={style.card} onClick={()=>this.challengePlay(this)} key={this.props.mychallenges.nameOfTheChallenge}>
          <CardMedia>
              <img src={this.props.mychallenges.imageUrl} />
          </CardMedia>
          <CardText style={style.cardtext}>
          <p><strong>{this.props.mychallenges.nameOfTheChallenge}</strong></p>
          <p><small>{this.props.mychallenges.durationInMins}mins {this.props.mychallenges.durationInSecs}secs </small></p>
          </CardText>
      </Card>
      <div>
        {this.state.isOpenDialog ? <ChallengePlayDialog  challenge={this.props.mychallenges} open={true} /> : null}
      </div>
    </div>
  )
}
}
