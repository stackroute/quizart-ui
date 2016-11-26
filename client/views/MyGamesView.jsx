import React from 'react';
import NavBar from '../components/NavBar';
import MyGamesComponent from './../components/MyGamesComponent';
import {Grid, Row, Col} from 'react-flexbox-grid';
import superagent from 'superagent';
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
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


export default class MyGamesView extends React.Component {
  constructor() {
      super();
      this.state = {
        myGamesJeop: [],
        slideIndex: 0,
      };
    }

    componentDidMount() {
        superagent
          .get('http://localhost:3000/myGamesJeopardy')
          .end((err, res) => {
            this.setState({myGamesJeop: res.body});
          });
    }

    handleChange = (value) => {
      this.setState({
        slideIndex: value,
      });
    };

  render() {
    const playerGameList = this.state.myGamesJeop ? this.state.myGamesJeop.map((myGamesJeopardy) => {
      return (
        <Col xs={12} sm={12} md={12} lg={12} key={myGamesJeopardy.category}>
          <MyGamesComponent myGamesJeopardy={myGamesJeopardy} />
        </Col>
      );
    }) : null;
    return (
      <div>
        <NavBar />
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
            <Grid>
              <Row center="xs" middle="xs">
                <Col xs={3} sm={3} md={3} lg={3}>Categories</Col>
                <Col xs={3} sm={3} md={3} lg={3}>Score</Col>
                <Col xs={3} sm={3} md={3} lg={3}> Position</Col>
                <Col xs={3} sm={3} md={3} lg={3}>Played On</Col>
              </Row>
              <Row center="xs">
                  {playerGameList}
              </Row>
              <Row center="xs">
                  <Link to="JeopardyScores/"><FlatButton label="Jeopardy Score" primary={true} /></Link>
              </Row>
            </Grid>
            </div>
          <div style={styles.slide}>
            slide n°2
            <Grid>
              <Row center="xs" middle="xs">
                <Col xs={3} sm={3} md={3} lg={3}>Topic</Col>
                <Col xs={3} sm={3} md={3} lg={3}>Score</Col>
                <Col xs={3} sm={3} md={3} lg={3}> Position</Col>
                <Col xs={3} sm={3} md={3} lg={3}>Played On</Col>
              </Row>
              <Row center="xs">
                  {playerGameList}
              </Row>
              <Row center="xs">
                  <Link to="JeopardyScores/"><FlatButton label="Jeopardy Score" primary={true} /></Link>
              </Row>
            </Grid>
          </div>
          </SwipeableViews>
        </div>

      </div>
    );
  }
}
