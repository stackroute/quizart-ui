import React from 'react';
import NavBar from '../components/NavBar';
import Login from '../components/Login';

export default class LoginView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Login/>
      </div>
    );
  }
}
