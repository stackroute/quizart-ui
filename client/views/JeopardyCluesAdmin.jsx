import React from 'react';
import NavBar from '../components/NavBar';
import JeopardyClues from './../components/JeopardyClues.jsx';

export default class JeopardyCluesAdmin extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <JeopardyClues />
      </div>
    );
  }
}
