import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
import superagent from 'superagent';
import Avatar from 'material-ui/Avatar';
import Gauge from 'react-svg-gauge';
import RaisedButton from 'material-ui/RaisedButton';


export default class JeopardyScoreCard extends React.Component{
  static get propTypes() {
    return {
      jeopardyScores: React.PropTypes.object.isRequired
    };
  }

  render(){
    const styles = {
      coinStyle: {
        height: 40,
        width: 30,
      },
      gridStyle:{
        backgroundColor: "white"
      },
    };
    var correctAns = this.props.jeopardyScores.noOfCorrectAns
    var totalAttempted = this.props.jeopardyScores.noOfAttemptedQues
    var avgTimeCorrectAns = this.props.jeopardyScores.avgTimeCorrectAns
    var accuracy = (correctAns/totalAttempted)*100;
    var confidence = (avgTimeCorrectAns/correctAns)*100;
    // accuracy = Math.round(accuracy);
    return(
      <MuiThemeProvider >
      <Paper>
        <Grid>
        <Row>
          <Col xs={3} sm={3} md={3} lg={3}><Avatar src={this.props.jeopardyScores.picture} size={90}/></Col>
          <Col xs={3} sm={3} md={3} lg={3}> {this.props.jeopardyScores.totalScore}</Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <div>
               <Gauge value={Math.round(accuracy)} width={100} height={80} label="" color="blue" />
           </div>
           </Col>
           <Col xs={3} sm={3} md={3} lg={3}>
           <div>
              <Gauge value={Math.round(confidence)} width={100} height={80} label="" color="green" />
          </div>
          </Col>
        </Row>
      </Grid>
      </Paper>
      </MuiThemeProvider>
    );
  }
}
