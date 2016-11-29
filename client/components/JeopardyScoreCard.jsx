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
  constructor() {
    super();
    this.state = {
      playerInfoJeop: []
    };
  }

  componentDidMount() {
      var thisSelf = this;
      superagent
        .get('http://localhost:3000/jeopardyScores')
        .end((err, res) => {
          thisSelf.setState({playerInfoJeop: res.body});
        });
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

    const playerScoreTiles = this.state.playerInfoJeop ? this.state.playerInfoJeop.map((jeopardyScores) => {
      return (
        <Col xs={12} sm={12} md={12} lg={12} key={jeopardyScores.totalScore}>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

            <Grid>
            <Row middle="xs">
              <Col xs={3} sm={3} md={3} lg={3}><Avatar src={jeopardyScores.picture} size={90}/></Col>
              <Col xs={3} sm={3} md={3} lg={3}> {jeopardyScores.totalScore}</Col>
              <Col xs={3} sm={3} md={3} lg={3}>
                <div>
                   <Gauge value={Math.round(jeopardyScores.accuracy)} width={100} height={80} label="" color="blue" />
               </div>
               </Col>
               <Col xs={3} sm={3} md={3} lg={3}>
               <div>
                  <Gauge value={Math.round(jeopardyScores.confidence)} width={100} height={80} label="" color="green" />
              </div>
              </Col>
            </Row>
          </Grid>

          </MuiThemeProvider>
        </Col>
      );
    }) : null;


    return(
      <MuiThemeProvider>
      <div>
        <Paper>
          <Grid className="container-fluid">
              <Row center="xs" middle="xs">
                <Col xs={3} sm={3} md={3} lg={3}>Player</Col>
                <Col xs={3} sm={3} md={3} lg={3}>Score</Col>
                <Col xs={3} sm={3} md={3} lg={3}> Accuracy</Col>
                <Col xs={3} sm={3} md={3} lg={3}>Confidence</Col>
              </Row>
            <Row center="xs">
                {playerScoreTiles}
            </Row>
            <Row center="xs"  middle="xs">
          <Col>
            <RaisedButton
            label="REPLAY"
            primary={true}
            // icon={<i className="material-icons">replay</i>}
          />
        </Col>
        <Col>
          <RaisedButton
          label="HOME"
          secondary={true}
          // icon={<i className="material-icons">home</i>}
          />
        </Col>
        </Row>
          </Grid>
        </Paper>
      </div>
      </MuiThemeProvider>
    );
  }
}
