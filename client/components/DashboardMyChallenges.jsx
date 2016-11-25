import React from 'react';
import {Table, TableBody,TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import {Grid, Row, Col} from 'react-flexbox-grid';
import superagent from 'superagent';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DashboardChallenges from './DashboardChallenges';

export default class CategoriesDash extends React.Component {
  constructor() {
    super();
    this.state = {
      mychallenges: [],
    //   fixedHeader: true,
    //   stripedRows: false,
    //   showRowHover: false,
    //   selectable: true,
    //   multiSelectable: false,
    //   enableSelectAll: false,
    //   deselectOnClickaway: true,
    // displayRowCheckbox: false,
    };
  }

  static get propTypes() {
    return {
      limit: React.PropTypes.number.isRequired
    };
  }

  componentDidMount() {
    superagent
      .get('http://localhost:3000/mychallenges/?_limit=' + this.props.limit)
      .end((err, res) => {
        this.setState({mychallenges: res.body});
      });
  }

  render() {
    const styles = {
      moreChallenges: {
        position: 'relative',
        top: '20px'
      }
    };
    // const challengeDisplay = this.state.mychallenges.slice(0,this.props.limit);
    const myChallengesDisplay= this.state.mychallenges.map((challenge) => {
      return (

        <Col xs={4} sm={3} md={2} lg={1} key={challenge.name}>
          <DashboardChallenges mychallenges={challenge}/>
        </Col>
      );
    });
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Grid>
            <Row center="xs" >
              <h2>My Challenges</h2>
            </Row>
            <Row >
          {myChallengesDisplay}
            </Row>
            <Row center="xs">
              <FloatingActionButton mini={true} style={styles.moreChallenges} >
                <NavigationExpandMore />
              </FloatingActionButton>
            </Row>
          </Grid>
      </MuiThemeProvider>
    );
  }
}
