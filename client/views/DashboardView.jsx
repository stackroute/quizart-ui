import React from 'react';
import NavBar from '../components/NavBar';
import MyChallenges from '../components/MyChallenges';
import CategoriesDash from '../components/CategoriesDash';
import MediaQuery from 'react-responsive';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router';

export default class DashboardView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />

        <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
          <CategoriesDash limit={3} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
          <CategoriesDash limit={3} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
          <CategoriesDash limit={4} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={1024} maxDeviceWidth={1439}>
          <CategoriesDash limit={6} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={1440}>
          <CategoriesDash limit={12} />
        </MediaQuery>
        <Grid>
          <Row xs="center">
            <Link to = '/waitingForPlayers'>
            <RaisedButton
                label="Play Jeopardy!"
                primary={ true }/>
            </Link>
          </Row>
        </Grid>
        <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
          <MyChallenges limit={3} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
          <MyChallenges limit={3} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
          <MyChallenges limit={5} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={1024} maxDeviceWidth={1439}>
          <MyChallenges limit={6} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={1440}>
          <MyChallenges limit={12} />
        </MediaQuery>
      </div>
    );
  }
}
