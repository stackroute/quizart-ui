import React from 'react';

import NavBar from '../components/NavBar';
import CategoriesDash from '../components/CategoriesDash';

import MediaQuery from 'react-responsive';

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
      </div>
    );
  }
}
