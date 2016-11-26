import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Row, Col} from 'react-flexbox-grid';



export default class TabsExampleSwipeable extends React.Component {
  static get propTypes() {
    return {
      myGamesJeopardy: React.PropTypes.object.isRequired
    };
  }

  render() {
    return (
    <MuiThemeProvider >
      <Paper>
          <div>
            <Grid>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3}>{this.props.myGamesJeopardy.category}</Col>
              <Col xs={3} sm={3} md={3} lg={3}>{this.props.myGamesJeopardy.score}</Col>
              <Col xs={3} sm={3} md={3} lg={3}>{this.props.myGamesJeopardy.position}</Col>
              <Col xs={3} sm={3} md={3} lg={3}>{this.props.myGamesJeopardy.playedDate}</Col>
              </Row>
            </Grid>
          </div>
        </Paper>
      </MuiThemeProvider >
    );
  }
}
