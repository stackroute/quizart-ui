import React from 'react';
import NavBar from '../components/NavBar';
import CreateChallengeForm from '../components/CreateChallengeForm';

export default class CreateChallenge extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
      <CreateChallengeForm />
      </div>
    );
  }
}
