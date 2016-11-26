import React from 'react';
import NavBar from '../components/NavBar';
import AllMyChallenges from '../components/AllMyChallenges'
export default class MyChallengeView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <AllMyChallenges/>
      </div>
    );
  }
}
