import React from 'react';
import NavBar from '../components/NavBar';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
import superagent from 'superagent';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Link from 'react-router';
import JeopardyScoreCard from './../components/JeopardyScoreCard';
import RaisedButton from 'material-ui/RaisedButton';

export default class CategoriesDash extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      playerInfoJeop: []
    };
  }

  componentDidMount() {
      superagent
        .get('http://localhost:3000/jeopardyScores')
        .end((err, res) => {
          this.setState({playerInfoJeop: res.body});
        });
  }

  render() {
    const playerScoreTiles = this.state.playerInfoJeop ? this.state.playerInfoJeop.map((jeopardyScores) => {
      return (
        <Col xs={12} sm={12} md={12} lg={12} key={jeopardyScores.totalScore}>
          <JeopardyScoreCard jeopardyScores={jeopardyScores} />
        </Col>
      );
    }) : null;

    console.log(playerScoreTiles);

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>
        <NavBar />
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
