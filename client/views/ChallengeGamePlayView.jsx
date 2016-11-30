import React from 'react';
import NavBar from '../components/NavBar';
import GamePlay from '../components/GamePlay';
import ScorecardAdaptive from '../components/ScorecardAdaptive';

import MediaQuery from 'react-responsive';

export default class ChallengeGamePlayView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
        <div>
          <GamePlay />

        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
        <div>
          <GamePlay />

        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
        <div>
          <GamePlay />

        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1024} maxDeviceWidth={1439}>
        <div>
          <GamePlay />

        </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1440}>
        <div>
          <GamePlay />

        </div>
        </MediaQuery>
      </div>
    );
  }
}
