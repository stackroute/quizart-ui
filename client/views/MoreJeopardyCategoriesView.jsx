import React from 'react';
import NavBar from '../components/NavBar';
import MoreJeopardyCategories from '../components/MoreJeopardyCategories';
import MediaQuery from 'react-responsive';

export default class MoreJeopardyCategoriesView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
          <MediaQuery minDeviceWidth={1} maxDeviceWidth={479}>
            <MoreJeopardyCategories limit={2} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={480} maxDeviceWidth={767}>
            <MoreJeopardyCategories  limit={2} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={768} maxDeviceWidth={1023}>
            <MoreJeopardyCategories  limit={4} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={1024} maxDeviceWidth={1439}>
            <MoreJeopardyCategories limit={6} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={1440}>
            <MoreJeopardyCategories limit={8} />
          </MediaQuery>
      </div>
    );
  }
}
