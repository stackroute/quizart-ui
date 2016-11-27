import React from 'react';
import {Table, TableBody,TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import { Link } from "react-router";
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid';
import superagent from 'superagent';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AllMyChallengesDisplay from './AllMyChallengesDisplay';

export default class AllMyChallenges extends React.Component {
  constructor() {
    super();
    this.state = {
      mychallenges: [],
    };
  }
  componentDidMount() {
    superagent
      .get('http://localhost:3000/mychallenges')
      .end((err, res) => {
        this.setState({mychallenges: res.body});
      });
  }
  render() {
    const styles = {
      createChallenges: {
        position: 'fixed', right: 100, bottom: 100
      }
    };
    const myChallengesDisplay= this.state.mychallenges.map((challenge) => {
      return (
          <AllMyChallengesDisplay mychallenges={challenge}/>
      );
    });
    return (

      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper>
          <Grid>
            <Row center="xs" >
              <h2>My Challenges</h2>
            </Row>
            <Row >
          {myChallengesDisplay}
            </Row>
            <Row >
            <Link to='createchallenge'>
              <FloatingActionButton style={styles.createChallenges}>
                <Add/>
              </FloatingActionButton>
            </Link>
            </Row>
          </Grid>
          </Paper>
      </MuiThemeProvider>
    );
  }
}
