import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import superagent from 'superagent';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

export default class TabsExampleSwipeable extends React.Component {
  constructor() {
      super();
      this.state = {
        myGamesJeopordyHistory: [],
        slideIndex: 0,
      };
    }



  componentWillMount() {
    var thisSelf = this;
      superagent
        .get('http://localhost:3000/myGamesJeopardy')
        .end((err, res) => {
        console.log("Hellooo",res.body);
          thisSelf.setState({myGamesJeopordyHistory: res.body});
        });
  }

    handleChange = (value) => {
      this.setState({
        slideIndex: value,
      });
    };

  render() {
    const playerGameList = this.state.myGamesJeopordyHistory ? this.state.myGamesJeopordyHistory.map((myGamesJeopardy) => {
      return (
        <Col xs={12} sm={12} md={12} lg={12} key={myGamesJeopardy.category}>
        <MuiThemeProvider >
      <Paper>
      <Table>
      <TableBody
        displayRowCheckbox = {false}>
            <TableRowColumn>{myGamesJeopardy.category}</TableRowColumn>
            <TableRowColumn>{myGamesJeopardy.score}</TableRowColumn>
            <TableRowColumn>{myGamesJeopardy.position}</TableRowColumn>
            <TableRowColumn>{myGamesJeopardy.playedDate}</TableRowColumn>
</TableBody>
            </Table>
        </Paper>
      </MuiThemeProvider >
        </Col>
      );
    }) : null;
    return (
    <MuiThemeProvider >
      <Paper>
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Jeopardy" value={0} />
          <Tab label="Challenges" value={1} />
          />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
        <div>
          <Table>
            <TableHeader
            adjustForCheckbox = {false}
            displaySelectAll = {false}
            deselectOnClickaway = {false}
            showRowHover = {false}
            stripedRows = {false}>
              <TableRow>
                <TableHeaderColumn>Category</TableHeaderColumn>
                <TableHeaderColumn>Score</TableHeaderColumn>
                <TableHeaderColumn>Position</TableHeaderColumn>
                <TableHeaderColumn>Last Played</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
            displayRowCheckbox = {false}
              deselectOnClickaway = {false}
              showRowHover = {false}
              stripedRows = {false}>
              <TableRow displaySelectAll={false}>
                {playerGameList}
              </TableRow>
            </TableBody>
          </Table>
          <Grid>
            <Row center="xs">
                <Link to="JeopardyScores/"><FlatButton label="Jeopardy Score" primary={true} /></Link>
            </Row>
          </Grid>
        </div>
        <div style={styles.slide}>
          slide n°2
          <Table>
            <TableHeader
            adjustForCheckbox = {false}
            displaySelectAll = {false}
            deselectOnClickaway = {false}
            showRowHover = {false}
            stripedRows = {true}
            >
              <TableRow>
                <TableHeaderColumn>Topic</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Position</TableHeaderColumn>
                <TableHeaderColumn>Last Played</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox = {false}>
              <TableRow>
                  {playerGameList}
              </TableRow>
            </TableBody>
          </Table>
          <Grid>
            <Row center="xs">
                <Link to="JeopardyScores/"><FlatButton label="Jeopardy Score" primary={true} /></Link>
            </Row>
          </Grid>
        </div>
        </SwipeableViews>
      </div>
        </Paper>
      </MuiThemeProvider >
    );
  }
}
