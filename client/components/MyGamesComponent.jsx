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
import JeopardyScoreCard from './JeopardyScoreCard';
import Dialog from 'material-ui/Dialog';

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

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
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
        thisSelf.setState({myGamesJeopordyHistory: res.body});
        });

  }

  state = {
      open: false,
    };

    handleOpen = () => {
      this.setState({open: true});
    };

    handleClose = () => {
      this.setState({open: false});
    };

    handleChange = (value) => {
      this.setState({
        slideIndex: value,
      });
    };

  render() {
    const actions = [
         <FlatButton
           label="Cancel"
           primary={true}
           onTouchTap={this.handleClose}
         />]
    const playerGameList = this.state.myGamesJeopordyHistory ? this.state.myGamesJeopordyHistory.map((myGamesJeopardy) => {
      return (
        <MuiThemeProvider >
        <Table>
          <TableBody
            displayRowCheckbox = {false}
            >
          <TableRow
            style = {{borderBottom: "0.8px solid #cccccc"}}
            displayRowCheckbox = {false}
            >
                <TableRowColumn>{myGamesJeopardy.category}</TableRowColumn>
                <TableRowColumn>{myGamesJeopardy.score}</TableRowColumn>
                <TableRowColumn>{myGamesJeopardy.position}</TableRowColumn>
                <TableRowColumn>{myGamesJeopardy.playedDate}</TableRowColumn>
          </TableRow></TableBody></Table>
      </MuiThemeProvider >
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
            >
              <TableRow>
                <TableHeaderColumn>Category</TableHeaderColumn>
                <TableHeaderColumn>Score</TableHeaderColumn>
                <TableHeaderColumn>Position</TableHeaderColumn>
                <TableHeaderColumn>Played</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
            displayRowCheckbox = {false}
              deselectOnClickaway = {false}
              showRowHover = {false}
              >
              <TableRow>
                {playerGameList}
              </TableRow>
            </TableBody>
          </Table>
          <Grid>
            <Row center="xs">
                <Link to="JeopardyScores/"><FlatButton label="Jeopardy Score" primary={true} /></Link>
                  {/* onTouchTap={this.handleOpen}/></Link> */}
                  {/* <Dialog
                   title="Dialog With Custom Width"
                   actions={actions}
                   modal={true}
                   contentStyle={customContentStyle}
                   open={this.state.open}
                 > */}
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
                <TableHeaderColumn>Played</TableHeaderColumn>
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
              <FlatButton label="Jeopardy Score" primary={true} onTouchTap={this.handleOpen}/>
                <Dialog
          title="Jeopardy!"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
            <JeopardyScoreCard />
        </Dialog>
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
