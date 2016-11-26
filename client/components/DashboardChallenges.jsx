import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'material-ui/Card';
import Dialog from 'material-ui/Dialog'
import {Grid, Row, Col} from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChallengePlayDialog from './ChallengePlayDialog';
const style = {
  card:{
    width:100,
    height:130,
    textAlign: 'center',
    marginLeft:30,
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
    ReactDOM.unmountComponentAtNode(document.getElementById('challengePlay'));
    ReactDOM.render(<MuiThemeProvider><ChallengePlayDialog open={true} challenge={this.props.mychallenges}/></MuiThemeProvider>,document.getElementById('challengePlay'));
  }
  render() {
    return (
        <div>
        <Card  style={style.card} onClick={this.challengePlay} key={this.props.mychallenges.nameOfTheChallenge}>
        <p><strong style={{color:'#3F51B5'}}>Name : {this.props.mychallenges.nameOfTheChallenge}</strong></p>
        <p>Duration : {this.props.mychallenges.durationInMins} </p>
      </Card>

    <div id='challengePlay'></div></div>

  )
}
}
