import React from 'react';
import {Table, TableBody,TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import {Grid, Row, Col} from 'react-flexbox-grid';
import superagent from 'superagent';
import { Link } from "react-router";
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import {cyan500,grey500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Challenge from './Challenge';
const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
});

const styles={
  paper:{
    width:window.innerWidth,
  }
}
export default class CategoriesDash extends React.Component {
  constructor() {
    super();
    this.state = {
      mychallenges: [],
    };
  }

  static get propTypes() {
    return {
      limit: React.PropTypes.number.isRequired
    };
  }

  componentDidMount() {
    superagent
      .get('myChallengesDash/' + this.props.limit)
      .end((err, res) => {
        console.log(res.body.message.length);
        this.setState({mychallenges: res.body.message});
      });
  }
  render() {
    const styles = {
      moreChallenges: {
        position: 'relative',
        top: '20px'
      }
    };
    const myChallengesDisplay= this.state.mychallenges.map((challenge) => {
      return (

        <Col xs={4} sm={2} md={2} lg={1} key={challenge.name}>
          <Challenge mychallenges={challenge}/>
        </Col>
      );
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <Paper style={styles.paper}>
          <Grid>
            <Row center="xs" >
              <h2>My Challenges</h2>
            </Row>
            <Row center="xs">
          {myChallengesDisplay}
            </Row>
            <Row center="xs">
              <Link to='allmychallenges'>
              <FloatingActionButton mini={true} style={styles.moreChallenges}>
                <NavigationExpandMore />
              </FloatingActionButton>
            </Link>
            </Row>
          </Grid>
          </Paper>
      </MuiThemeProvider>
    );
  }
}
