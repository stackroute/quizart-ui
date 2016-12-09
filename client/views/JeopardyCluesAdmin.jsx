import React from 'react';
import NavBar from '../components/NavBar';
import JeopardyCluesHome from './../components/JeopardyCluesHome.jsx';

export default class JeopardyCluesAdmin extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <JeopardyCluesHome />
      </div>
    );
  }
}
